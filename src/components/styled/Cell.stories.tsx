import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Cell from './Cell';

export default {
    title: 'UI Elements/styled/Cell',
    component: Cell,
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const Dead = Template.bind({});
Dead.args = {
    state: 'dead'
};

export const Young = Template.bind({});
Young.args = {
    state: 'young'
};

export const Old = Template.bind({});
Old.args = {
    state: 'old'
};