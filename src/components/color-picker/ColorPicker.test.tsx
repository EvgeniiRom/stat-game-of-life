import { fireEvent, screen, render } from "@testing-library/react";
import React from "react";
import ColorPicker from "./ColorPicker";

describe("ColorPicker", () => {
    describe("slider", () => {
        it("white", () => {
            const onChangeColor = jest.fn();
            render(<ColorPicker onChangeColor={onChangeColor} />);
            const input = screen.getByTestId("color-slider");
            fireEvent.change(input, { target: { value: "100" } });
            expect(onChangeColor).toBeCalledWith("#ffffff");
        });
        it("black", () => {
            const onChangeColor = jest.fn();
            render(<ColorPicker onChangeColor={onChangeColor} />);
            const input = screen.getByTestId("color-slider");
            fireEvent.change(input, { target: { value: "-100" } });
            expect(onChangeColor).toBeCalledWith("#000000");
        });
    });
});
