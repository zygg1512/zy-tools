const fs = require('fs')
const { statSync, readdirSync } = fs
const { runparallel } = require('./run')

const dirs = readdirSync('packages').filter(_d => {
    const buildPackage = process.argv[2] || ''
    let isBuild = true
    if (buildPackage) isBuild = _d === buildPackage
    return statSync(`packages/${_d}`).isDirectory() && isBuild
})

// 并行打包所有文件夹
runparallel(dirs)
