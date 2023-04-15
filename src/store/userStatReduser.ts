import { RootState } from "./../store";
import { takeEvery, call, put } from "@redux-saga/core/effects";
import { createSelector } from "@reduxjs/toolkit";
import { PLAYER_NAME_KEY } from "../AppConstants";
import { CallEffect, ForkEffect, PutEffect } from "redux-saga/effects";

const LOGIN = "src/store/userStat/LOGIN";
const LOGOUT = "src/store/userStat/LOGOUT";
const CLICK = "src/store/userStat/CLICK";

interface LoginAction {
    type: typeof LOGIN;
    name: string;
}
interface LogoutAction {
    type: typeof LOGOUT;
}
interface ClickAction {
    type: typeof CLICK;
    button: string;
}

export type Action = LoginAction | LogoutAction | ClickAction;

interface UserStatState {
    isLogin: boolean;
    name?: string;
    buttonClicks: Record<string, number>;
}

const initState: UserStatState = {
    isLogin: false,
    buttonClicks: {},
};

export default function reducer(
    state: UserStatState = initState,
    action: Action
): UserStatState {
    switch (action.type) {
        case LOGIN:
            return { ...initState, name: action.name, isLogin: true };
        case LOGOUT:
            return initState;
        case CLICK:
            const clickCount = (state.buttonClicks[action.button] || 0) + 1;
            return {
                ...state,
                buttonClicks: {
                    ...state.buttonClicks,
                    [action.button]: clickCount,
                },
            };
        default:
            return state;
    }
}

export const login = (name: string): Action => {
    return { type: LOGIN, name };
};

export const logout = (): Action => {
    return { type: LOGOUT };
};

export const buttonClick = (button: string): Action => {
    return { type: CLICK, button };
};

export const statNameSelector = createSelector(
    (state: RootState) => state.stat,
    (stat: UserStatState) => stat.name
);

export const loginSelector = createSelector(
    (state: RootState) => state.stat,
    (stat: UserStatState) => stat.isLogin
);

export const clickSelector = createSelector(
    (state: RootState) => state.stat,
    (stat: UserStatState) => stat.buttonClicks
);

export const getNameFromLocalStore = (): string | null | false =>
    typeof window !== "undefined" && localStorage.getItem(PLAYER_NAME_KEY);
export const setNameToLocalStore = (name: string) =>
    typeof window !== "undefined" &&
    localStorage.setItem(PLAYER_NAME_KEY, name);
export const cleanLocalStore = () =>
    typeof window !== "undefined" && localStorage.removeItem(PLAYER_NAME_KEY);

function* onLogin(action: LoginAction): Generator<CallEffect, void, void> {
    yield call(setNameToLocalStore, action.name);
}

function* onLogout(): Generator<CallEffect, void, void> {
    yield call(cleanLocalStore);
}

export function* loginSaga(): Generator<
    CallEffect | PutEffect | ForkEffect,
    void,
    string | null
> {
    const name = yield call(getNameFromLocalStore);
    if (name) {
        yield put(login(name));
    }
    yield takeEvery(LOGIN, onLogin);
    yield takeEvery(LOGOUT, onLogout);
}
