import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userStatReduser, { loginSaga } from "./store/userStatReduser";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
    stat: userStatReduser,
});

function* rootSaga() {
    yield all([loginSaga()]);
}

const createNoopStorage = () => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string) {
            return Promise.resolve(value);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const persistConfig = {
    key: "root",
    storage,
};

export function setupStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: persistReducer(persistConfig, rootReducer),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat(sagaMiddleware),
    });
    sagaMiddleware.run(rootSaga);
    const persistor = persistStore(store);
    return { store, persistor };
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
