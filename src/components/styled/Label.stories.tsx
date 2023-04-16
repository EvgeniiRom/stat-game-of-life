import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Label from "./Label";

export default {
    title: "UI Elements/styled/Label",
    component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args}>Label</Label>;

export const Small = Template.bind({});
Small.args = {
    size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
    size: "medium",
};

export const Large = Template.bind({});
Large.args = {
    size: "large",
};
