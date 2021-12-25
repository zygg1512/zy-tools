const execa = require('execa')

// 并行打包所有文件夹
async function build(target) {
    await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], {
        stdio: 'inherit' // 子进程的输出需要在父进程中打印
    })
}

build('reactivity')
