const execa = require('execa')
const { questionHandle } = require('./question')
const { runparallel } = require('../run')

async function runPublish() {
    const { packageNames, versionType } = await questionHandle()
    // 打包代码
    await runparallel(packageNames.map((_p) => _p.name))
    // 并行发布
    for (const pck of packageNames) {
        build(pck.dir, versionType)
    }
}

async function build(dir, versionType) {
    await execa('npm', ['version', versionType], {
        stdio: 'inherit', // 子进程的输出需要在父进程中打印
        cwd: dir
    })
    await execa('npm', ['publish', '--access', 'public', '--registry=https://registry.npmjs.org'], {
        stdio: 'inherit', // 子进程的输出需要在父进程中打印
        cwd: dir
    })
}

runPublish()

module.exports = {
    runPublish
}
