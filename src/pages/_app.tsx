import { AppStore, setupStore } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
    const [store, setStore] = useState<AppStore>(setupStore(false));

    useEffect(() => {
        setStore(setupStore(true));
    }, []);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
