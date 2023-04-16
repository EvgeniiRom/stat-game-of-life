import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import GameField from "./GameField";

export default {
    title: "UI Elements/GameField",
    component: GameField,
} as ComponentMeta<typeof GameField>;

const Template: ComponentStory<typeof GameField> = (args) => <GameField {...args} />;

export const AllDead = Template.bind({});
AllDead.args = {
    field: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
};

export const Chess = Template.bind({});
Chess.args = {
    field: [
        [0, 1, 2, 0, 1],
        [1, 2, 0, 1, 2],
        [2, 0, 1, 2, 0],
        [0, 1, 2, 0, 1],
        [1, 2, 0, 1, 0],
    ],
};
