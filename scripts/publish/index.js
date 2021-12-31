const execa = require('execa')
const { askQuestion } = require('./ask')
const { runparallel } = require('../run')
const { gitPush } = require('../git-push')
const { infoLog, successLog } = require('../log')
const { clear } = require('../shell')

async function runPublish() {
    const { packageNames, versionType } = await askQuestion()
    // 打包代码
    await runparallel(packageNames.map(_p => _p.name))
    // 并行发布
    infoLog('并行发布')
    const _res = []
    for (const pck of packageNames) {
        _res.push(build(pck.dir, versionType))
    }
    await Promise.all(_res)
    clear()
    successLog('发布成功')
    // 推送到远端
    gitPush(`publish: publish packages of ${packageNames.map(pck => pck.name).join('、')}`)
}

async function build(dir, versionType) {
    if (versionType) {
        await execa('pnpm', ['version', versionType], {
            stdio: 'inherit', // 子进程的输出需要在父进程中打印
            cwd: dir
        })
    }
    const pbulishCommand = ['publish', '--access', 'public', '--registry=https://registry.npmjs.org', '--no-git-checks']

    if (versionType) pbulishCommand.push('--force')

    await execa('pnpm', pbulishCommand, {
        stdio: 'inherit', // 子进程的输出需要在父进程中打印
        cwd: dir
    })
}

runPublish()
