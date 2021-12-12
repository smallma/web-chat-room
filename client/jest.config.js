// module.exports = {
//   // 转义
//   transform: {
//     '^.+\\.vue$': 'vue-jest',
//     '^.+\\js$': 'babel-jest',
//     "^.+\\.(t|j)sx?$": "ts-jest"
//   },
//   moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
// }


module.exports = {
  preset: 'ts-jest',
  // preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{ts,vue}", "!**/node_modules/**", "!**/coverage/**", "!**/vite.config.ts"],
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}
