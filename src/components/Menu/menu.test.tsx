import React from 'react'
import {render,RenderResult,fireEvent,cleanup} from '@testing-library/react'
import Menu,{MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
const testProps:MenuProps = {
    defaultIndex:'0',
    onSelect:jest.fn(),
    className:'test'
}
const testVerProps:MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}
const generateMenu =(props:MenuProps)=>{
    return(
        <Menu {...props}>
        <MenuItem >hello world0</MenuItem>
        <MenuItem disabled>hello world1</MenuItem>
        <MenuItem >hello world2</MenuItem>
        <li>hello world3</li>
        {/* <SubMenu title="submenu">
            <MenuItem>one</MenuItem>
            <MenuItem>two</MenuItem>
            <MenuItem>three</MenuItem>
        </SubMenu> */}
      </Menu>
    )
}
let wrapper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement
describe('test Menu and MenuItem component',()=>{
    // beforeEach 避免重复 每个测试keys前都会执行 
    beforeEach(()=>{
        wrapper= render(generateMenu(testProps))
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('hello world0')
        disabledElement= wrapper.getByText('hello world1')
    })
    it('should render correct menu and menuItem based on default props',()=>{
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
       // expect(menuElement.querySelectorAll(':scope > li').length).toEqual(3)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback',()=>{
        const thirdItem = wrapper.getByText('hello world2')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical mode when mode is set to "vertical"',()=>{
         cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })

})