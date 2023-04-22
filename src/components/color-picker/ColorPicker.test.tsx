import { setupStore } from "@/store";
import { fireEvent, screen, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import ColorPicker from "./ColorPicker";

describe("ColorPicker", () => {
    describe("slider", () => {
        it("white", () => {
            const store = setupStore(true);
            render(
                <Provider store={store}>
                    <ColorPicker />
                </Provider>
            );
            const input = screen.getByTestId("color-slider");
            fireEvent.change(input, { target: { value: "100" } });
            expect(store.getState().config.color).toEqual("#ffffff");
        });
        it("black", () => {
            const store = setupStore(true);
            render(
                <Provider store={store}>
                    <ColorPicker />
                </Provider>
            );
            const input = screen.getByTestId("color-slider");
            fireEvent.change(input, { target: { value: "-100" } });
            expect(store.getState().config.color).toEqual("#000000");
        });
    });
});
