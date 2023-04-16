const ADD_GAME = "src/store/staticticReduser/ADD_GAME";
const CLEAN = "src/store/staticticReduser/CLEAN";

interface AddGameAction {
    type: typeof ADD_GAME;
}

interface CleanAction {
    type: typeof CLEAN;
}

export type Action = AddGameAction | CleanAction;

interface StatisticState {
    gameSeq: number;
    generationCount: number[];
    dencity: number[];
    finished: boolean[];
}

const initState: StatisticState = {
    gameSeq: 0,
    generationCount: [],
    dencity: [],
    finished: [],
};

export default function reducer(state: StatisticState = initState, action: Action): StatisticState {
    switch (action.type) {
        case ADD_GAME:
            return { ...state };
        case CLEAN:
            return initState;
        default:
            return state;
    }
}

export const addGame = (): Action => {
    return { type: ADD_GAME };
};
export const logout = (): Action => {
    return { type: CLEAN };
};
