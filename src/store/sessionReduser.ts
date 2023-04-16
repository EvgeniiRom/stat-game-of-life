import { PLAYER_NAME_KEY } from "../AppConstants";
import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from "redux-saga/effects";

const LOGIN = "src/store/sessionReduser/LOGIN";
const LOGOUT = "src/store/sessionReduser/LOGOUT";

interface LoginAction {
    type: typeof LOGIN;
    playerName: string;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type Action = LoginAction | LogoutAction;

interface SessionState {
    isLogin: boolean;
    playerName?: string;
}

const initState: SessionState = {
    isLogin: false,
};

export default function reducer(state: SessionState = initState, action: Action): SessionState {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLogin: true, playerName: action.playerName };
        case LOGOUT:
            return initState;
        default:
            return state;
    }
}

export const login = (playerName: string): Action => {
    return { type: LOGIN, playerName };
};
export const logout = (): Action => {
    return { type: LOGOUT };
};

export const playerNameSelector = createSelector(
    (state: RootState) => state.session,
    (session: SessionState) => session.playerName
);
export const loginSelector = createSelector(
    (state: RootState) => state.session,
    (session: SessionState) => session.isLogin
);

export const getNameFromLocalStore = (): string | null | false =>
    typeof window !== "undefined" && localStorage.getItem(PLAYER_NAME_KEY);
export const setNameToLocalStore = (name: string) =>
    typeof window !== "undefined" && localStorage.setItem(PLAYER_NAME_KEY, name);
export const cleanLocalStore = () => typeof window !== "undefined" && localStorage.removeItem(PLAYER_NAME_KEY);

function* onLogin(action: LoginAction): Generator<CallEffect, void, void> {
    yield call(setNameToLocalStore, action.playerName);
}

function* onLogout(): Generator<CallEffect, void, void> {
    yield call(cleanLocalStore);
}

export function* loginSaga(): Generator<CallEffect | PutEffect | ForkEffect, void, string | null> {
    const name = yield call(getNameFromLocalStore);
    if (name) {
        yield put(login(name));
    }
    yield takeEvery(LOGIN, onLogin);
    yield takeEvery(LOGOUT, onLogout);
}
