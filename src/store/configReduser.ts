import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const SET_COLOR = "src/store/sessionReduser/SET_COLOR";

interface SetColorAction {
    type: typeof SET_COLOR;
    color: string;
}

export type Action = SetColorAction;

interface ConfigState {
    color: string;
}

const initState: ConfigState = {
    color: "#ff0000",
};

export default function reducer(state: ConfigState = initState, action: Action): ConfigState {
    switch (action.type) {
        case SET_COLOR:
            return { ...state, color: action.color };
        default:
            return state;
    }
}

export const setColor = (color: string): Action => {
    return { type: SET_COLOR, color };
};

export const colorSelectior = createSelector(
    (state: RootState) => state.config,
    (session: ConfigState) => session.color
);
