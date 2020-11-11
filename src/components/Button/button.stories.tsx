import React from 'react'
import  Button,{ ButtonProps } from './button';
import { Meta,Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
export default { component: Button, title: 'Button'} as Meta;

const Template: Story<ButtonProps> = (args) => <Button onClick={action('clicked')} {...args} />;
// Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { size: 'lg', btnType: 'primary' };
export const Danger = Template.bind({});
Danger.args = { size: 'sm', btnType: 'danger'  };
export const Default = Template.bind({});
Default.args = { size: 'sm', btnType: 'default'  };
export const Link = Template.bind({});
Link.args = { size: 'sm', btnType: 'link' , href: '#' };
