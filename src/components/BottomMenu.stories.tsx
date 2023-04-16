import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import BottomMenu from "./BottomMenu";
import { Provider } from "react-redux";
import { setupStore } from "../store";

export default {
    title: "UI Elements/BottomMenu",
    component: BottomMenu,
} as ComponentMeta<typeof BottomMenu>;

const store = setupStore(false);

const Template: ComponentStory<typeof BottomMenu> = () => (
    <Provider store={store}>
        <BottomMenu />;
    </Provider>
);

export const Default = Template.bind({});
