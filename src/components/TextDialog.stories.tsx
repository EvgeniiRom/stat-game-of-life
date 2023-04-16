import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextDialog from "./TextDialog";

export default {
    title: "UI Elements/TextDialog",
    component: TextDialog,
} as ComponentMeta<typeof TextDialog>;

const Template: ComponentStory<typeof TextDialog> = (args) => <TextDialog message="Some message" {...args} />;

export const Default = Template.bind({});
