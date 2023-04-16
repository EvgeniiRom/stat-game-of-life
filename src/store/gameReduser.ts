/* eslint-disable @typescript-eslint/no-explicit-any */
const ADD_GEN = "src/store/gameReduser/ADD_GEN";
const SIZE = "src/store/gameReduser/SIZE";
const SPEED = "src/store/gameReduser/SPEED";
const CLEAN = "src/store/gameReduser/CLEAN";

interface AddGenAction {
    type: typeof ADD_GEN;
}

interface SizeAction {
    type: typeof SIZE;
}

interface SpeedAction {
    type: typeof SPEED;
}

interface CleanAction {
    type: typeof CLEAN;
}

export type Action = AddGenAction | SizeAction | SpeedAction | CleanAction;

interface GameState {
    generations: any;
    speed: any;
    size: any;
}

const initState: GameState = {
    generations: undefined,
    speed: undefined,
    size: undefined,
};

export default function reducer(state: GameState = initState, action: Action): GameState {
    switch (action.type) {
        case ADD_GEN:
            return { ...initState };
        case SIZE:
            return { ...initState };
        case SPEED:
            return { ...initState };
        case CLEAN:
            return { ...initState };
        default:
            return state;
    }
}

export const addGen = (): Action => {
    return { type: ADD_GEN };
};
export const setSize = (): Action => {
    return { type: SIZE };
};
export const setSpeed = (): Action => {
    return { type: SPEED };
};
export const clean = (): Action => {
    return { type: CLEAN };
};
