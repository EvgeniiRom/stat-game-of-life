import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Cell from "./Cell";

export default {
    title: "UI Elements/styled/Cell",
    component: Cell,
    argTypes: {
        color: { control: "color" },
    },
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const Dead = Template.bind({});

export const Red = Template.bind({});
Red.args = {
    color: "#f00",
};

export const Green = Template.bind({});
Green.args = {
    color: "#0f0",
};

export const Blue = Template.bind({});
Blue.args = {
    color: "#00f",
};
