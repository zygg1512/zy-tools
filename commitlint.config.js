module.exports = {
    extends: [
      "@commitlint/config-conventional"
    ],
    rules: {
        /**
         * build：编译相关的修改，例如发布版本、对项目构建或者依赖的改动
         * feature：新特性、新功能
         * fix：修改bug
         * perf：优化相关，比如提升性能、体验
         * docs：文档修改
         * refactor：代码重构
         */
      'type-enum': [2, 'always', [
        'feature', 'fix', 'perf','build', 'refactor', 'docs'
       ]],
      'type-empty': [2, 'always'],
      'subject-empty': [2, 'always'],
      'subject-full-stop': [0, 'never'],
      'header-max-length': [0, 'always', 72]
    }
  };
  