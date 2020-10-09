import React from 'react'
import {render,RenderResult} from '@testing-library/react'
import Menu,{MenuProps} from './menu'
import MenuItem from './menuItem'

const testProps:MenuProps = {
    defaultIndex:0,
    onSelect:jest.fn(),
    className:'test'
}
const generateMenu =(props)=>{
    return(
        <Menu {...props}>
        <MenuItem index={0}>hello world0</MenuItem>
        <MenuItem index={1} disabled>hello world1</MenuItem>
        <MenuItem index={2}>hello world2</MenuItem>
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
    })
    it('click items should change active and call the right callback',()=>{

    })
    it('should render vertical mode when mode is set to "vertical"',()=>{

    })

})