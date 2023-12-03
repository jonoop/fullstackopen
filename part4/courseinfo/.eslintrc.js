module.exports = {
  env: {
    browser: true, // 在浏览器环境中运行
    es2021: true, // 使用 ES2021 语法支持
    node: true, // 在 Node.js 环境中运行
    jest: true, // 在 Jest 环境中运行
  },
  extends: [
    'airbnb', // 使用 Airbnb 的代码风格
    'plugin:react/recommended', // 推荐的 React 规则
    'plugin:react-hooks/recommended', // 推荐的 React Hooks 规则
    'plugin:jsx-a11y/recommended', // 用于检查 JSX 中的可访问性问题
    'plugin:import/errors', // 导入/导出错误检查
    'plugin:import/warnings', // 导入/导出警告检查
    'plugin:import/typescript', // 支持 TypeScript 的导入/导出检查
    'prettier', // 整合 Prettier 的代码风格
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // 支持 JSX
    },
    ecmaVersion: 12, // ECMAScript 语法版本
    sourceType: 'module', // 使用 ES6 模块语法
  },
  plugins: [
    'react', // 包含 React 插件
    'react-hooks', // 包含 React Hooks 插件
  ],
  rules: {
    // 自定义规则
    'react/react-in-jsx-scope': 'off', // 不强制 React 被引入
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx'] },
    ], // 允许在 .js 和 .jsx 文件中使用 JSX
    // 在这里添加更多自定义规则
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ], // import 排序
  },
};
