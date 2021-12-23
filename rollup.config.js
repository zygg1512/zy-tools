import ts from '@rollup/plugin-typescript' // 解析 ts
import resolve from '@rollup/plugin-node-resolve' // 允许加载第三方模块
import commonjs from '@rollup/plugin-commonjs' // 将它们转换为ES6版本
import babel from '@rollup/plugin-babel'
import path from 'path'
// 获取 packages 路径
const packagesDir = path.resolve(__dirname, 'packages')
// 获取对应要打包的路径
const packageDir = path.resolve(packagesDir, process.env.TARGET)

const resolveDirPath = (p) => path.resolve(packageDir, p)

// 获取 package.json 内容
const pck = require(resolveDirPath('package.json'))

const buildOptions = pck.buildOptions
const moduleName = path.basename(packageDir) //获取目录的最后一个名字
const outputConfig = {
    es: {
        file: resolveDirPath(`dist/${moduleName}.esm.js`),
        format: 'es'
    },
    cjs: {
        file: resolveDirPath(`dist/${moduleName}.cjs.js`),
        format: 'cjs'
    },
    iife: {
        file: resolveDirPath(`dist/${moduleName}.js`),
        format: 'iife'
    }
}

function createConfig(format) {
    const output = outputConfig[format]
    // 用于 iife 在 window 上挂载的属性
    output.name = buildOptions.name
    output.sourcemap = true
    return {
        input: resolveDirPath('src/index.ts'),
        output,
        plugins: [
            resolve(),
            commonjs(),
            ts({
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'runtime'
            })
        ]
    }
}
export default buildOptions.formats.map(createConfig)
