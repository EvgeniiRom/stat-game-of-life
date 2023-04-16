import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import BottomMenu from "./BottomMenu";

export default {
    title: "UI Elements/BottomMenu",
    component: BottomMenu,
} as ComponentMeta<typeof BottomMenu>;

const Template: ComponentStory<typeof BottomMenu> = (args) => <BottomMenu {...args} />;

export const Default = Template.bind({});

export const Active = Template.bind({});
Active.args = {
    activeSize: "50x30",
    activeSpeed: "medium",
};
