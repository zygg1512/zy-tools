const chalk = require('chalk')

const infoLog = (content = '', head = 'INFO') => console.log(`${chalk.bgBlue.white(head)}${chalk.blue(content)}`)
const errorLog = (content = '', head = 'ERROR') => console.error(`${chalk.bgRed.white(head)}${chalk.red(content)}`)
const successLog = (content = '', head = 'SUCCESS') =>
    console.log(`${chalk.bgGreen.white(head)}${chalk.green(content)}`)

module.exports = {
    infoLog,
    errorLog,
    successLog
}
