const execa = require('execa')
async function gitPush(msg) {
    if (!msg) return
    await execa('git', ['add', '.'], {
        stdio: 'inherit' // 子进程的输出需要在父进程中打印
    })
    await execa('git', ['commit', '-m', msg])
    await execa('git', ['push'])
}

module.exports = {
    gitPush
}
