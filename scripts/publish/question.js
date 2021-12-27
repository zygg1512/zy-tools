const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')

const readDir = path.resolve(process.cwd(), 'packages')
const dirs = fs.readdirSync(readDir)
const versionType = ['大版本号', '小版本号', '补丁版本号']

const updatePackages = {
    type: 'checkbox',
    name: 'packageNames',
    message: '更新哪几个包？',
    pageSize: dirs.length,
    choices: dirs,
    validate(val = []) {
        if (val.length) return true
        return '请选择要更新的包'
    },
    filter(packges) {
        return packges.map((pck) => ({
            dir: path.resolve(readDir, pck),
            name: pck
        }))
    }
}
const updateVersionType = {
    type: 'list',
    name: 'versionType',
    message: '更新版本类型？',
    pageSize: versionType.length,
    choices: versionType.map((_v, _i) => ({ name: _v, checked: _i === 0, value: _i })),
    validate(val = []) {
        if (val.length) return true
        return '请选择更新的版本号'
    },
    when({ packageNames }) {
        // 当 packageNames 有值时才会提问当前问题
        return packageNames.length
    }
}
const questionHandle = async () => inquirer.prompt([updatePackages, updateVersionType])

module.exports = {
    questionHandle
}
