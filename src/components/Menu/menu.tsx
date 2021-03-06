import React,{useState,createContext,FC,CSSProperties} from 'react';
import classNames from 'classnames';
import { MenuItemProps} from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex:string) => void;
export interface MenuProps{
    /** 默认选中项 */ 
    defaultIndex?: string;
    className?: string;
    /** menu 的方向 */ 
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
    /** 默认打开的子menu*/ 
    defaultOpenSubmenus?:string[];
}
interface IMenuContext {
    index:string;
    onSelect?:SelectCallback;
    mode?:MenuMode;
    defaultOpenSubmenus?:string[];
}
export const MenuContext = createContext<IMenuContext>({index:'0'})
const Menu:FC<MenuProps> = (props) => {
    const {defaultIndex,className, mode, style,children,onSelect,defaultOpenSubmenus} = props;
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('viking-menu',className,{
        'menu-vertical':mode === 'vertical',
        'menu-horizontal':mode !== 'vertical'
    })
    const handleClick = (index: string) =>{
        setActive(index)
        if(onSelect){
          onSelect(index)
        }
    }
    const passedContent:IMenuContext ={
        index: currentActive ? currentActive : '0',
        onSelect:handleClick,
        mode,
        defaultOpenSubmenus
    }
    const renderChildren = () =>{
        return React.Children.map(children,(child,index)=>{
           const childElement = child as React.FunctionComponentElement<MenuItemProps>
           const { displayName } = childElement.type
           if(displayName==='MenuItem'||displayName==='SubMenu'){
               return React.cloneElement(childElement,{
                   index:index.toString()
               })
           }else{
               console.error("Warning: Menu has a child which is not a MenuItem component!")
           }
        })
    }
    return (
       <ul
        className={classes}
        style={style}
        data-testid="test-menu"
       >    
       <MenuContext.Provider value={passedContent}>
         {renderChildren()}
       </MenuContext.Provider>   
       </ul>
    )
}
Menu.defaultProps={
    defaultIndex:'0',
    mode:'horizontal',
    defaultOpenSubmenus:[]
}
export default Menu
