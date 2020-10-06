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
const Button: React.FC<BaseButtonProps> = (props) => {
    const {className, disabled, size, btnType, children, href} = props;
    const classes =classnames('btn',{
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled':(btnType === ButtonType.Link) && disabled
    })
    console.log(classes)
    if(btnType===ButtonType.Link && href){
        return (
            <a 
                className={classes}
                href={href}
            >
                {children}
            </a>
        )
    }else{
        return(
            <button
                className={classes}
                disabled = {disabled}
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