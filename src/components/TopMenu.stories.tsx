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

const Template: ComponentStory<typeof TopMenu> = (args) => (
    <Provider store={store}>
        <TopMenu text="Generation 0" {...args} />
    </Provider>
);

export const Default = Template.bind({});

export const Run = Template.bind({});
Run.args = {
    active: "run",
};

export const Pause = Template.bind({});
Pause.args = {
    active: "pause",
};
