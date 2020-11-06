/*
 * @Descripttion: 
 * @version: v-1
 * @Author: lovecode
 * @Date: 2020-10-06 13:57:36
 * @LastEditors: lovecode
 * @LastEditTime: 2020-11-05 21:26:35
 */

import React from 'react';
import classnames from 'classnames';
export enum ButtonSize {
    Large = 'lg', 
    Small = 'sm' 
}
export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}
interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: React.ReactNode,
    href?: string
}
// 结合原生button 和 a 标签 上的属性
type  NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type  AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
//  有些属性a标签上独有 有些是button上独有所以使用typescript上的Partial 使属性为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    const {className, disabled, size, btnType, children, href,...restProps} = props;
    const classes =classnames('btn',className,{
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled':(btnType === ButtonType.Link) && disabled
    })
    if(btnType===ButtonType.Link && href){
        return (
            <a 
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    }else{
        return(
            <button
                className = {classes}
                disabled = {disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}
Button.defaultProps = {
    disabled:false,
    btnType:ButtonType.Default,
    children:'button'
}
export default Button