const path = require('path')
const fs = require('fs')
const { questionHandle } = require('./question')
const execa = require('execa')

async function runCommond() {
    // 获取用户选择内容
    const { packageNames, versionType } = await questionHandle()
    return packageNames.map((_p) => {
        const version = getPackage(_p).version
        const newVersion = setVersion(version, versionType)
        const errReset = updateVersion(_p, newVersion)
        return {
            dir: _p,
            errReset
        }
    })
}

function getPackage(dir) {
    const pckPath = path.resolve(dir, 'package.json')
    return require(pckPath)
}

function updateVersion(dir, newVersion) {
    const context = getPackage(dir)
    const oldContext = JSON.parse(JSON.stringify(context))
    const errReset = () => {
        writePackage(dir, oldContext)
    }
    context.version = newVersion
    writePackage(dir, context)
    return errReset
}

function writePackage(dir, context) {
    const pckPath = path.resolve(dir, 'package.json')
    fs.writeFileSync(pckPath, JSON.stringify(context, '', '\t'), {
        flag: 'w'
    })
}

function setVersion(oldVersion, updateVersionType) {
    const versions = oldVersion.split('.')
    const bigVersion = +versions[0]
    const smallVersion = +versions[1]
    const patchVersion = +versions[2]
    let newVersion = ''
    switch (updateVersionType) {
        case 0:
            newVersion = `${bigVersion + 1}.0.0`
            break
        case 1:
            newVersion = `${bigVersion}.${smallVersion + 1}.0`
            break
        case 2:
            newVersion = `${bigVersion}.${smallVersion}.${patchVersion + 1}`
            break
    }
    return newVersion
}

async function runPublish() {
    const packageNames = await runCommond()
    // 并行发布
    for (const pck of packageNames) {
        build(pck)
    }
}

async function build({ dir, errReset }) {
    await execa('npm', ['publish', '--access', 'public'], {
        stdio: 'inherit', // 子进程的输出需要在父进程中打印
        cwd: dir
    }).catch(() => {
        errReset()
    })
}

runPublish()
