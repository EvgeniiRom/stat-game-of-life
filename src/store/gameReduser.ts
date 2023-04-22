import { generateFieldByField } from "./../common/Tools";
import { addGameStat, cleanGameStatistic, fixSessionStat, updateSessionStat } from "./statisticReduser";
import { ForkEffect, put, PutEffect, takeEvery } from "redux-saga/effects";
import { Field, generateField } from "../common/Tools";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

/* eslint-disable @typescript-eslint/no-explicit-any */
const NEXT_GEN = "src/store/gameReduser/NEXT_GEN";
const NEW_GAME = "src/store/gameReduser/NEW_GAME";
const SIZE = "src/store/gameReduser/SIZE";
const SPEED = "src/store/gameReduser/SPEED";
const MODE = "src/store/gameReduser/MODE";
const CLEAN = "src/store/gameReduser/CLEAN";

export type SizeType = "50x30" | "70x50" | "100x80";
export type ModeType = "run" | "pause";

interface NextGenAction {
    type: typeof NEXT_GEN;
    field: Field;
}
interface NewGameAction {
    type: typeof NEW_GAME;
    field: Field;
}
interface SizeAction {
    type: typeof SIZE;
    size: SizeType;
}
interface SpeedAction {
    type: typeof SPEED;
    speed: number;
}
interface ModeAction {
    type: typeof MODE;
    mode: ModeType;
}
interface CleanAction {
    type: typeof CLEAN;
}

type Action = NextGenAction | NewGameAction | SizeAction | SpeedAction | ModeAction | CleanAction;

interface GameState {
    field: Field;
    speed: number;
    size: SizeType;
    mode: ModeType;
}

const initState: GameState = {
    field: generateField(50, 30),
    speed: 400,
    size: "50x30",
    mode: "pause",
};

export default function reducer(state: GameState = initState, action: Action): GameState {
    switch (action.type) {
        case NEXT_GEN:
        case NEW_GAME:
            return { ...state, field: action.field };
        case SIZE:
            const [width, height] = action.size.split("x").map((item) => parseInt(item));
            const field = generateFieldByField(width, height, state.field);
            return { ...state, field: field, size: action.size };
        case SPEED:
            return { ...state, speed: action.speed };
        case MODE:
            return { ...state, mode: action.mode };
        case CLEAN:
            return { ...state, field: generateField(state.field.width, state.field.height) };
        default:
            return state;
    }
}

export const nextGen = (field: Field): Action => {
    return { type: NEXT_GEN, field };
};
export const newGame = (field: Field): Action => {
    return { type: NEW_GAME, field };
};
export const setSize = (size: SizeType): Action => {
    return { type: SIZE, size };
};
export const setSpeed = (speed: number): Action => {
    return { type: SPEED, speed };
};
export const setMode = (mode: ModeType): Action => {
    return { type: MODE, mode };
};
export const clean = (): Action => {
    return { type: CLEAN };
};

export const generationSelector = createSelector(
    (state: RootState) => state.game,
    (game: GameState) => game.field
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

function* onNextGen(action: NextGenAction): Generator<PutEffect, void, void> {
    const field = action.field;
    const sum = field.data.reduce((sum, row) => sum + row.reduce((a, b) => a + (b ? 1 : 0), 0), 0);
    yield put(addGameStat(sum));
    yield put(updateSessionStat((sum / (field.width * field.height)) * 100));
}

export function* gameSaga(): Generator<PutEffect | ForkEffect, void, string | null> {
    yield takeEvery(NEXT_GEN, onNextGen);
    yield takeEvery([NEW_GAME, CLEAN], function* () {
        yield put(cleanGameStatistic());
        yield put(fixSessionStat());
    });
}
