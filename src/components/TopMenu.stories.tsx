import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TopMenu from "./TopMenu";
import { Provider } from "react-redux";
import { setupStore } from "../store";

export default {
    title: "UI Elements/TopMenu",
    component: TopMenu,
} as ComponentMeta<typeof TopMenu>;

const store = setupStore(false);

const Template: ComponentStory<typeof TopMenu> = () => (
    <Provider store={store}>
        <TopMenu />
    </Provider>
);

export const Default = Template.bind({});
