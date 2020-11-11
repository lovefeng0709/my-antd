/*
 * @Descripttion: 
 * @version: v-1
 * @Author: lovecode
 * @Date: 2020-10-06 13:57:36
 * @LastEditors: love-coding
 * @LastEditTime: 2020-11-11 23:10:55
 */

import React,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes} from 'react';
import classnames from 'classnames';
export type ButtonSize = 'lg'|'sm';
export type ButtonType = 'primary'|'default'|'danger'|'link';
interface BaseButtonProps {
    className?: string;
    /** 设置button的禁用 */
    disabled?: boolean;
    /** 设置button的大小 */
    size?: ButtonSize;
    /** 设置button的类型 */
    btnType?: ButtonType;
    children?: React.ReactNode,
    href?: string
}
// 结合原生button 和 a 标签 上的属性
type  NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type  AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
//  有些属性a标签上独有 有些是button上独有所以使用typescript上的Partial 使属性为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
export const Button: FC<ButtonProps> = (props) => {
    const {className, disabled, size, btnType, children, href,...restProps} = props;
    const classes =classnames('btn',className,{
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled':(btnType === 'link') && disabled
    })
    if(btnType==='link' && href){
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
    btnType:'default',
    children:'button'
}
export default Button