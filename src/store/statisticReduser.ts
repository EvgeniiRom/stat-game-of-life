import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const ADD_GAME_STAT = "src/store/staticticReduser/ADD_GAME_STAT";
const UPDATE_COLOR_STAT = "src/store/staticticReduser/UPDATE_COLOR_STAT";
const CLEAN_GAME_STAT = "src/store/staticticReduser/CLEAN_GAME_STAT";
const FIX_SESSION_STAT = "src/store/staticticReduser/FIX_SESSION_STAT";
const UPDATE_SESSION_STAT = "src/store/staticticReduser/UPDATE_SESSION_STAT";
const CLEAN_SESSION_STAT = "src/store/staticticReduser/CLEAN_SESSION_STAT";

interface AddGameAction {
    type: typeof ADD_GAME_STAT;
    gameResult: number;
}

interface UpdateColorStat {
    type: typeof UPDATE_COLOR_STAT;
    colorStat: Record<string, number>;
}

interface CleanGameAction {
    type: typeof CLEAN_GAME_STAT;
}

interface FixSessionAction {
    type: typeof FIX_SESSION_STAT;
}

interface UpdateSessionAction {
    type: typeof UPDATE_SESSION_STAT;
    sessionResult: number;
}

interface CleanSessionAction {
    type: typeof CLEAN_SESSION_STAT;
}

export type Action =
    | AddGameAction
    | UpdateColorStat
    | CleanGameAction
    | FixSessionAction
    | UpdateSessionAction
    | CleanSessionAction;

export interface StatisticState {
    colorStat: Record<string, number>;
    gameStat: number[];
    sessionStat: number[];
    lastSessionFixed: boolean;
}

const initState: StatisticState = {
    colorStat: {},
    gameStat: [],
    sessionStat: [],
    lastSessionFixed: false,
};

export default function reducer(state: StatisticState = initState, action: Action): StatisticState {
    switch (action.type) {
        case ADD_GAME_STAT:
            return { ...state, gameStat: [...state.gameStat, action.gameResult] };
        case UPDATE_COLOR_STAT:
            return { ...state, colorStat: action.colorStat };
        case CLEAN_GAME_STAT:
            return { ...state, gameStat: [], colorStat: {} };
        case FIX_SESSION_STAT:
            return { ...state, lastSessionFixed: true };
        case UPDATE_SESSION_STAT:
            const fixedSessions = state.lastSessionFixed
                ? state.sessionStat
                : [...state.sessionStat.slice(0, state.sessionStat.length - 1)];
            return { ...state, sessionStat: [...fixedSessions, action.sessionResult], lastSessionFixed: false };
        case CLEAN_SESSION_STAT:
            return { ...state, sessionStat: [], lastSessionFixed: false };
        default:
            return state;
    }
}

export const addGameStat = (gameResult: number): Action => {
    return { type: ADD_GAME_STAT, gameResult };
};
export const updataColorStat = (colorStat: Record<string, number>): Action => {
    return { type: UPDATE_COLOR_STAT, colorStat };
};
export const cleanGameStatistic = (): Action => {
    return { type: CLEAN_GAME_STAT };
};
export const fixSessionStat = (): Action => {
    return { type: FIX_SESSION_STAT };
};
export const updateSessionStat = (sessionResult: number): Action => {
    return { type: UPDATE_SESSION_STAT, sessionResult };
};
export const cleanSessionStatistic = (): Action => {
    return { type: CLEAN_SESSION_STAT };
};

export const gameStatisticSelector = createSelector(
    (state: RootState) => state.statistic,
    (statistic: StatisticState) => statistic.gameStat
);

export const colorStatisticSelector = createSelector(
    (state: RootState) => state.statistic,
    (statistic: StatisticState) => statistic.colorStat
);

export const sessionStatisticSelector = createSelector(
    (state: RootState) => state.statistic,
    (statistic: StatisticState) => statistic.sessionStat
);
