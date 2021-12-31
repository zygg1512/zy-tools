const execa = require('execa')
const { infoLog, errorLog, successLog } = require('./log')
const { clear } = require('./shell')
async function build(target) {
    await execa('npx', ['eslint', `packages/${target}/src/**`], {
        stdio: 'inherit' // 子进程的输出需要在父进程中打印
    })
    await execa('rm', ['-rf', `packages/${target}/dist`])
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
        stdio: 'inherit' // 子进程的输出需要在父进程中打印
    })
}
// 并发打包
async function runparallel(dirs) {
    clear()
    infoLog(`${dirs.join(' 、')}构建中`)
    let result = []
    for (let item of dirs) {
        result.push(build(item))
    }
    try {
        await Promise.all(result)
        clear()
        successLog(`构建完成`)
    } catch (e) {
        errorLog(`构建失败`)
    }
}

module.exports = {
    runparallel
}
