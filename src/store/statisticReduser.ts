import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const ADD_GAME = "src/store/staticticReduser/ADD_GAME";
const CLEAN = "src/store/staticticReduser/CLEAN";

interface AddGameAction {
    type: typeof ADD_GAME;
    result: number;
}

interface CleanAction {
    type: typeof CLEAN;
}

export type Action = AddGameAction | CleanAction;

interface StatisticState {
    results: number[];
}

const initState: StatisticState = {
    results: [],
};

export default function reducer(state: StatisticState = initState, action: Action): StatisticState {
    switch (action.type) {
        case ADD_GAME:
            return { ...state, results: [...state.results, action.result] };
        case CLEAN:
            return initState;
        default:
            return state;
    }
}

export const addResult = (result: number): Action => {
    return { type: ADD_GAME, result };
};
export const cleanGameStatistic = (): Action => {
    return { type: CLEAN };
};

export const statisticResultsSelector = createSelector(
    (state: RootState) => state.statistic,
    (statistic: StatisticState) => statistic.results
);
