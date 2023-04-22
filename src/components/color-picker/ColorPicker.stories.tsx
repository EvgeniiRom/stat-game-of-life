import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ColorPicker from "./ColorPicker";
import { setupStore } from "../../store";
import { Provider } from "react-redux";

export default {
    title: "UI Elements/ColorPicker",
    component: ColorPicker,
} as ComponentMeta<typeof ColorPicker>;

const store = setupStore(false);

const Template: ComponentStory<typeof ColorPicker> = (args) => (
    <Provider store={store}>
        <ColorPicker {...args} />
    </Provider>
);

export const Default = Template.bind({});
