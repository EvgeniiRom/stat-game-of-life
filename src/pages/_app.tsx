import { setupStore } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
    const store = setupStore();

    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}
