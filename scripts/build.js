const fs = require('fs')
const { statSync, readdirSync } = fs
const { runparallel } = require('./run')

const dirs = readdirSync('packages').filter((_d) => statSync(`packages/${_d}`).isDirectory())

// 并行打包所有文件夹
runparallel(dirs)
