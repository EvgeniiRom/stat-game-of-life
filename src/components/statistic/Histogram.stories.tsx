import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Histogram from "./Histogram";

export default {
    title: "UI Elements/Histogram",
    component: Histogram,
} as ComponentMeta<typeof Histogram>;

const Template: ComponentStory<typeof Histogram> = (args) => <Histogram {...args} />;

export const RGB = Template.bind({});
RGB.args = {
    data: { "#ff0000": 100, "#00ff00": 50, "#0000bb": 80 },
};
