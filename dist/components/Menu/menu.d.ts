import React, { FC, CSSProperties } from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    /** 默认选中项 */
    defaultIndex?: string;
    className?: string;
    /** menu 的方向 */
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
    /** 默认打开的子menu*/
    defaultOpenSubmenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubmenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: FC<MenuProps>;
export default Menu;
