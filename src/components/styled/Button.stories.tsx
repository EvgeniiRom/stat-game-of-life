import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
    title: 'UI Elements/styled/Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} >Button</Button>;

export const Default = Template.bind({});

export const Active = Template.bind({});
Active.args = {
    active: true
};