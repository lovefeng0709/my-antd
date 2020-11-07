import React from 'react'
import {render,RenderResult,fireEvent,cleanup,waitFor} from '@testing-library/react';
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
    mode: 'vertical',
    defaultOpenSubmenus: ['4']
}
const generateMenu =(props:MenuProps)=>{
    return(
        <Menu {...props}>
            <MenuItem >hello world0</MenuItem>
            <MenuItem disabled>hello world1</MenuItem>
            <MenuItem >hello world2</MenuItem>
            {/* <li>hello world3</li> */}
            <SubMenu title="dropdown">
                <MenuItem>
                drop1
                </MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>
                opened1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}
const createStyleFile=()=>{
    const cssFile:string = `
        .viking-submenu {
            display:none;
        }
        .viking-submenu.menu-opened {
            display: block;
        }
    
    `
    const style = document.createElement('style')
    style.type ='text/css'
    style.innerHTML = cssFile
    return style
}
let wrapper:RenderResult, wrapper2: RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement
describe('test Menu and MenuItem component',()=>{
    // beforeEach 避免重复 每个测试keys前都会执行 
    beforeEach(()=>{
        wrapper= render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('hello world0')
        disabledElement= wrapper.getByText('hello world1')
    })
    it('should render correct menu and menuItem based on default props',()=>{
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(7)
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
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
    it('should show dropdown items when hover on subMenu',async ()=>{
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(() => {
         expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
           })
    })
})
describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
      wrapper2 = render(generateMenu(testVerProps))
      wrapper2.container.append(createStyleFile())
    })
    it('should render vertical mode when mode is set to vertical', () => {
      const menuElement = wrapper2.getByTestId('test-menu')
      expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when click on subMenu for vertical mode', () => {
      const dropDownItem = wrapper2.queryByText('drop1')
      expect(dropDownItem).not.toBeVisible()
      fireEvent.click(wrapper2.getByText('dropdown'))
      expect(dropDownItem).toBeVisible()
    })
    it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
      expect(wrapper2.queryByText('opened1')).toBeVisible()
    })
  })