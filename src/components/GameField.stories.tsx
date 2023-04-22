import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import GameField from "./GameField";

export default {
    title: "UI Elements/GameField",
    component: GameField,
} as ComponentMeta<typeof GameField>;

const Template: ComponentStory<typeof GameField> = (args) => <GameField {...args} />;

export const AllDead = Template.bind({});

const u = undefined;
const r = "#ff0000";
const g = "#00ff00";
const b = "#0000ff";

AllDead.args = {
    field: [
        [u, u, u, u, u],
        [u, u, u, u, u],
        [u, u, u, u, u],
        [u, u, u, u, u],
        [u, u, u, u, u],
    ],
};

export const Chess = Template.bind({});
Chess.args = {
    field: [
        [u, r, g, b, u],
        [r, g, b, u, r],
        [g, b, u, r, g],
        [b, u, r, g, b],
        [u, r, g, b, u],
    ],
};
