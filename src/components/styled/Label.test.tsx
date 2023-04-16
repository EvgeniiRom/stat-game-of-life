import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Label from "./Label";

describe("Label", () => {
    describe("render", () => {
        test("text 1", () => {
            render(<Label>Hello, I`m label</Label>);
            const labelElement = screen.getByText(/Hello, I`m label/);
            expect(labelElement).toBeInTheDocument();
        });

        test("text 2", () => {
            render(<Label>Another text</Label>);
            const labelElement = screen.getByText(/Another text/);
            expect(labelElement).toBeInTheDocument();
        });
    });
});
