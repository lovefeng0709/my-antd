import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 antd-imitation 组件库</h1>
        <p>antd-imitation 仿制的一个antd组件库的轮子</p>
        <h3>安装试试</h3>
        <code>
          npm install antd-imitation  --save  
        </code>
        <br/>
        <code>
          yarn add antd-imitation 
        </code>
      </>
    )
  }, { info : { disable: true }})