
import React from 'react';
import {render, fireEvent} from '@testing-library/react'
import Button,{ButtonProps} from './button';
// 
const defaultProps = {
    onClick:jest.fn()
}
const testProps:ButtonProps = {
    btnType:'primary',
    size:'lg',
    className:'kclass'
}
const disabledProps:ButtonProps = {
    disabled:true,
    onClick:jest.fn() 
}
describe('test Button component',()=>{
    it('should render the correct default button',()=>{
        const { getByText } = render(<Button {...defaultProps}>nice</Button>);
        const element = getByText('nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy();
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    })
    it('should render the correct component based on different props',()=>{
        const { getByText } = render(<Button {...testProps}>nice</Button>);
        const element = getByText('nice');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn-primary btn-lg kclass');
    })
    it('should render a link when btnType equals link and href is provided',()=>{
        const { getByText} = render(<Button btnType={'link'} href="https://www.baidu.com">link</ Button>)
        const element =getByText('link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('should render disabled button when disabled set to true', ()=>{
        const { getByText } = render(<Button {...disabledProps}>disabled</Button>);
        const element = getByText('disabled') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })
})