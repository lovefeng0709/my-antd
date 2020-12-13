import React, { FC } from 'react';
export interface MenuItemProps {
    index?: string;
    /** 是否禁用 */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
