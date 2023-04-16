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

export default function reducer(
    state: SessionState = initState,
    action: Action
): SessionState {
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
export const loginout = (): Action => {
    return { type: LOGOUT };
};
