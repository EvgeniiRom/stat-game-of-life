import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ColorPicker from "./ColorPicker";

export default {
    title: "UI Elements/ColorPicker",
    component: ColorPicker,
} as ComponentMeta<typeof ColorPicker>;

const Template: ComponentStory<typeof ColorPicker> = (args) => <ColorPicker {...args} />;

export const Default = Template.bind({});
