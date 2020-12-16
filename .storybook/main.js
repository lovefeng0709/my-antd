/*
 * @Descripttion: 
 * @version: v-1
 * @Author: love-coding
 * @Date: 2020-11-08 19:40:29
 * @LastEditors: love-coding
 * @LastEditTime: 2020-12-16 22:15:16
 */
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    // "@storybook/preset-scss",
  ],
  typescript: {
    check: false,
    checkOptions: {
    },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}