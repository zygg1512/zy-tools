const { questionHandle } = require('./question')
const execa = require('execa')
const { runparallel } = require('../run')
const { updateVersion, setVersion, getPackage } = require('./version')

async function getUpdatePackages() {
    // 获取用户选择内容
    const { packageNames, versionType } = await questionHandle()
    return packageNames.map((_p) => {
        const version = getPackage(_p.dir).version
        const newVersion = setVersion(version, versionType)
        const errReset = updateVersion(_p.dir, newVersion)
        return {
            ..._p,
            errReset
        }
    })
}

async function runPublish() {
    const packageNames = await getUpdatePackages()
    // 打包代码
    await runparallel(packageNames.map((_p) => _p.name))
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

module.exports = {
    runPublish
}
