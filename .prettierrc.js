module.exports = {
    // 使用单引号
    singleQuote: true,
    // 末尾不需要逗号
    trailingComma: 'none',
    // 一行最多 100 字符
    printWidth: 120,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 不使用缩进符，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: false,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    overrides: [
        {
            files: ['*.json5'],
            options: {
                singleQuote: false,
                quoteProps: 'preserve',
            },
        },
        {
            files: ['*.yml'],
            options: {
                singleQuote: false,
            },
        },
    ]
};
