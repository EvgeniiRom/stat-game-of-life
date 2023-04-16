import { Field, generateField } from "../common/Tools";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SET_GEN = "src/store/gameReduser/SET_GEN";
const ADD_GEN = "src/store/gameReduser/ADD_GEN";
const MOD_GEN = "src/store/gameReduser/MOD_GEN";
const SIZE = "src/store/gameReduser/SIZE";
const SPEED = "src/store/gameReduser/SPEED";
const MODE = "src/store/gameReduser/MODE";
const CLEAN = "src/store/gameReduser/CLEAN";

export type SpeedType = "slow" | "medium" | "fast";
export type SizeType = "50x30" | "70x50" | "100x80";
export type ModeType = "run" | "pause";

interface SetGenAction {
    type: typeof SET_GEN;
    generations: Field[];
}
interface AddGenAction {
    type: typeof ADD_GEN;
    field: Field;
}
interface ModGenAction {
    type: typeof MOD_GEN;
    field: Field;
}
interface SizeAction {
    type: typeof SIZE;
    size: SizeType;
}
interface SpeedAction {
    type: typeof SPEED;
    speed: SpeedType;
}
interface ModeAction {
    type: typeof MODE;
    mode: ModeType;
}
interface CleanAction {
    type: typeof CLEAN;
}

type Action = SetGenAction | AddGenAction | ModGenAction | SizeAction | SpeedAction | ModeAction | CleanAction;

interface GameState {
    generations: Field[];
    speed: SpeedType;
    size: SizeType;
    mode: ModeType;
}

const initState: GameState = {
    generations: [generateField(50, 30)],
    speed: "medium",
    size: "50x30",
    mode: "pause",
};

export default function reducer(state: GameState = initState, action: Action): GameState {
    switch (action.type) {
        case SET_GEN:
            return { ...state, generations: action.generations };
        case ADD_GEN:
            return { ...state, generations: [...state.generations, action.field] };
        case MOD_GEN:
            const generations = [...state.generations.slice(0, state.generations.length - 1), action.field];
            return { ...state, generations };
        case SIZE:
            return { ...state, size: action.size };
        case SPEED:
            return { ...state, speed: action.speed };
        case MODE:
            return { ...state, mode: action.mode };
        case CLEAN:
            return { ...initState };
        default:
            return state;
    }
}

export const setGen = (generations: Field[]): Action => {
    return { type: SET_GEN, generations };
};
export const modGen = (field: Field): Action => {
    return { type: MOD_GEN, field };
};
export const addGen = (field: Field): Action => {
    return { type: ADD_GEN, field };
};
export const setSize = (size: SizeType): Action => {
    return { type: SIZE, size };
};
export const setSpeed = (speed: SpeedType): Action => {
    return { type: SPEED, speed };
};
export const setMode = (mode: ModeType): Action => {
    return { type: MODE, mode };
};
export const clean = (): Action => {
    return { type: CLEAN };
};

export const lastGenerationSelector = createSelector(
    (state: RootState) => state.game,
    (game: GameState) => game.generations[game.generations.length - 1]
);
export const sizeSelector = createSelector(
    (state: RootState) => state.game,
    (game: GameState) => game.size
);
export const speedSelector = createSelector(
    (state: RootState) => state.game,
    (game: GameState) => game.speed
);
export const modeSelector = createSelector(
    (state: RootState) => state.game,
    (game: GameState) => game.mode
);
