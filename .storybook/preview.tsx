/*
 * @Descripttion: 
 * @version: v-1
 * @Author: love-coding
 * @Date: 2020-11-08 19:40:29
 * @LastEditors: love-coding
 * @LastEditTime: 2020-12-13 20:15:45
 */
// 导入样式
import '../src/styles/index.scss';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
import { addDecorator,addParameters } from '@storybook/react';
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

