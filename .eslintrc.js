module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // 추가: Node.js 환경을 사용함을 명시
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    'vue/return-in-computed-property': 'off',
  },
};