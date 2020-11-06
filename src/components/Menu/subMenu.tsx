import React,{useContext,useState} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem'
export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string
}
const SubMenu:React.FC<SubMenuProps> = ({index, title, className,children}) => {
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubmenus as Array<string> 
    const isOpen = (index && context.mode ==='vertical')? openedSubMenus.includes(index):false;
    const [menuOpen,setOpen] = useState(isOpen)
    const classes = classNames('menu-item submenu-item',className,{
        'is-active': context.index === index
    })
    const handleClick = (e:React.MouseEvent)=>{
        e.preventDefault()
        setOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e:React.MouseEvent,toggled:boolean)=>{
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(()=>{
            setOpen(toggled)
        },300)
    }
    const clickEvents = context.mode === 'vertical'? {
        onClick : handleClick
    }:{}
    const hoverEvents = context.mode !== 'vertical'? {
        onMouseEnter : (e:React.MouseEvent)=>{handleMouse(e,true)},
        onMouseLeave : (e:React.MouseEvent)=>{handleMouse(e,false)}
    }:{}
    console.log(hoverEvents)
    const renderChildren = ()=>{
        const subMenuClasses = classNames('viking-submenu',{
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children,(child,i)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName==='MenuItem'){
                return React.cloneElement(childElement,{
                    index:`${index}-${i}`,
                })
            }else{
                console.error("Warning: SubMenu has a child which is not a MenuItem component!")
            }
        })
        return(
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = "SubMenu";
export default SubMenu;
