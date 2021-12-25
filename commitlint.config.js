module.exports = {
    extends: ['@commitlint/config-conventional'],
    // 由 name 和配置数组组成
    // 如：'name:[0, 'always', 72]'
    // 数组中第一位为 log level，可选`0, 1, 2`，0 为 disable，1 为 warning，2 为 error
    // 第二位为应用与否，可选 always | never
    // 第三位该 rule 的值
    rules: {
        // type 取值返回
        'type-enum': [2, 'always', ['upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert']],
        // type 不能为空
        'type-empty': [2, 'always'],
        // subject 不能为空
        'subject-empty': [2, 'always'],
        'header-max-length': [0, 'always', 72]
    }
}
