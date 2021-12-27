const path = require('path')
const fs = require('fs')
const { questionHandle } = require('./question')
const execa = require('execa')

async function runCommond() {
    // 获取用户选择内容
    const { packageNames, versionType } = await questionHandle()
    packageNames.forEach((_p) => {
        const version = getPackage(_p).version
        const newVersion = setVersion(version, versionType)
        updateVersion(_p, newVersion)
    })
}

function getPackage(dir) {
    const pckPath = path.resolve(dir, 'package.json')
    return require(pckPath)
}

function updateVersion(dir, newVersion) {
    const context = getPackage(dir)
    context.version = newVersion
    const pckPath = path.resolve(dir, 'package.json')
    fs.writeFileSync(pckPath, JSON.stringify(context, '', '\t'), {
        flag: 'w'
    })
}

function setVersion(oldVersion, updateVersionType) {
    const versions = oldVersion.split('.')
    const bigVersion = versions[0]
    const smallVersion = versions[1]
    const patchVersion = versions[2]
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
    await runCommond()
    await execa('pnpm', ['publish', '--registry=https://registry.npmjs.org/'], {
        stdio: 'inherit' // 子进程的输出需要在父进程中打印
    })
}

runPublish()
