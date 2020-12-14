/*
 * @Descripttion: 
 * @version: v-1
 * @Author: love-coding
 * @Date: 2020-11-08 19:40:29
 * @LastEditors: love-coding
 * @LastEditTime: 2020-12-14 22:17:43
 */
// 导入样式

import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
import '../src/styles/index.scss';
import "./fix_info_style.scss"
import { addDecorator,addParameters,configure } from '@storybook/react';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
// 所有组件设置 一个容器 margin值 3em
import { withInfo } from '@storybook/addon-info';
const wrapperStyles: React.CSSProperties ={
  padding:'20px 40px'
}
const storyWrapper =(storyFn:any) =>(
  <div style={wrapperStyles}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: {
  inline: true,
  header:false
}
})
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};


// automatically import all files ending in *.stories.js
configure(loaderFn, module);

