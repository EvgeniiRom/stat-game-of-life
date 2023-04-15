import reducer, { buttonClick, cleanLocalStore, getNameFromLocalStore, login, loginSaga, logout, setNameToLocalStore } from './userStatReduser';
import { expectSaga } from 'redux-saga-test-plan';
import { PLAYER_NAME_KEY } from '../AppConstants';

test("loading reduser", () => {
    let state = reducer(undefined, login('myname'));
    expect(state).toEqual({ isLogin: true, name: 'myname', buttonClicks: {} })

    state = reducer(state, buttonClick('button1'));
    expect(state).toEqual({ isLogin: true, name: 'myname', buttonClicks: { button1: 1 } })

    state = reducer(state, buttonClick('button2'));
    expect(state).toEqual({ isLogin: true, name: 'myname', buttonClicks: { button1: 1, button2: 1 } })

    state = reducer(state, buttonClick('button1'));
    state = reducer(state, buttonClick('button1'));
    expect(state).toEqual({ isLogin: true, name: 'myname', buttonClicks: { button1: 3, button2: 1 } })

    state = reducer(state, logout());
    expect(state).toEqual({ isLogin: false, buttonClicks: {} })
})

describe('loginSaga', () => {
    test("start", () => {
        return expectSaga(loginSaga)
            .call(getNameFromLocalStore)
            .not.call(setNameToLocalStore)
            .not.call(cleanLocalStore)
            .not.put(logout())
            .run({ silenceTimeout: true })
    })    
    test("restore from local store", () => {
        const playerName = 'some player';
        const playerName2 = 'another one';
        localStorage.setItem(PLAYER_NAME_KEY, playerName);
        return expectSaga(loginSaga)
            .dispatch(logout())
            .dispatch(login(playerName2))
            .put(login(playerName))
            .call(getNameFromLocalStore)
            .call(cleanLocalStore)
            .call(setNameToLocalStore, playerName2)
            .run({ silenceTimeout: true })
    })
})