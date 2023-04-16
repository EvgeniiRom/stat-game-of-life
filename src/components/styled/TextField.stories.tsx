import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextField from "./TextField";

export default {
    title: "UI Elements/styled/TextField",
    component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const Default = Template.bind({});

export const FixedValue = Template.bind({});
FixedValue.args = {
    value: "Some text",
};

export const Error = Template.bind({});
Error.args = {
    error: true,
};
