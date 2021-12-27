const execa = require('execa')
const { infoLog, errorLog, successLog } = require('./log')
const { clear } = require('./shell')
async function gitPush(msg) {
    if (!msg) {
        errorLog('git commit 信息不能为空')
        return
    }
    infoLog('开始提交代码')
    await execa('git', ['add', '.'], {
        stdio: 'inherit' // 子进程的输出需要在父进程中打印
    })
    await execa('git', ['commit', '-m', msg])
    infoLog('loading...')
    await execa('git', ['push'])
    successLog('push success')
    clear()
}

module.exports = {
    gitPush
}
