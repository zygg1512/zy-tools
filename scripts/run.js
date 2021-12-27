const execa = require('execa')
async function build(target) {
    await execa('rm', ['-rf', `packages/${target}/dist`])
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
        stdio: 'inherit' // 子进程的输出需要在父进程中打印
    })
}
// 并发打包
function runparallel(dirs) {
    console.log(`${dirs.join(', ')}构建中`)
    let result = []
    for (let item of dirs) {
        result.push(build(item))
    }
    return Promise.all(result)
}

module.exports = {
    runparallel
}
