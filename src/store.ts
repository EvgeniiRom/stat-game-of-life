import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReduser, { gameSaga } from "./store/gameReduser";
import sessionReduser, { loginSaga } from "./store/sessionReduser";
import statisticReduser from "./store/statisticReduser";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    game: gameReduser,
    session: sessionReduser,
    statistic: statisticReduser,
});

function* rootSaga() {
    yield all([loginSaga(), gameSaga()]);
}

export function setupStore(runSaga: boolean) {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    });
    runSaga && sagaMiddleware.run(rootSaga);
    return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
