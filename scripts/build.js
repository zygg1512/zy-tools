import { statSync, readdirSync } from 'fs'
import { execa } from 'execa'

const dirs = readdirSync('packages').filter((_d) => statSync(`packages/${_d}`).isDirectory())
// 并行打包所有文件夹
async function build(target) {
    await execa('rm', ['-rf', `packages/${target}/dist`])
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
        stdio: 'inherit' // 子进程的输出需要在父进程中打印
    })
}
// 并发打包
function runparallel(dirs, iterFn) {
    let result = []
    for (let item of dirs) {
        result.push(iterFn(item))
    }
    return Promise.all(result)
}

runparallel(dirs, build)
