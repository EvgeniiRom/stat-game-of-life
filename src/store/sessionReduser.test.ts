import { PLAYER_NAME_KEY } from "@/AppConstants";
import { expectSaga } from "redux-saga-test-plan";
import {
    cleanLocalStore,
    getNameFromLocalStore,
    login,
    loginSaga,
    logout,
    setNameToLocalStore,
} from "./sessionReduser";

describe("session saga", () => {
    test("start", () => {
        return expectSaga(loginSaga)
            .call(getNameFromLocalStore)
            .not.call(setNameToLocalStore)
            .not.call(cleanLocalStore)
            .not.put(logout())
            .run({ silenceTimeout: true });
    });
    test("restore from local store", () => {
        const playerName = "some player";
        const playerName2 = "another one";
        localStorage.setItem(PLAYER_NAME_KEY, playerName);
        return expectSaga(loginSaga)
            .dispatch(logout())
            .dispatch(login(playerName2))
            .put(login(playerName))
            .call(getNameFromLocalStore)
            .call(cleanLocalStore)
            .call(setNameToLocalStore, playerName2)
            .run({ silenceTimeout: true });
    });
});
