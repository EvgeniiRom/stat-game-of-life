import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import TextField from "./TextField";

describe("TextField", () => {
    it("render some text", () => {
        render(<TextField />);
        const textbox = screen.getByRole("textbox");
        fireEvent.change(textbox, { target: { value: "some text" } });
        expect(textbox).toHaveValue("some text");
        fireEvent.change(textbox, { target: { value: "another text" } });
        expect(textbox).toHaveValue("another text");
    });
});
