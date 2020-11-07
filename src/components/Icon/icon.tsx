/*
 * @Descripttion: antd icon demo
 * @version: my-antd-v1.0
 * @Author: love-coding
 * @Date: 2020-11-07 22:35:21
 * @LastEditors: love-coding
 * @LastEditTime: 2020-11-07 22:58:25
 */
import React from 'react';
import classNames from 'classnames';
import {FontAwesomeIcon,FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
export interface IconProps extends FontAwesomeIconProps{
    theme?: ThemeProps
}
const Icon: React.FC<IconProps> =(props)=>{
    // icon-primary  
    const {className,theme,...restProps} = props;
    const classes = classNames('viking-icon', className,{
        [`icon-${theme}`]:theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps}/>
    )
}
export default Icon