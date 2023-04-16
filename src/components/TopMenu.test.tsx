import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import TopMenu from "./TopMenu";
import { renderWithProviders } from "../utils/testUtils";

describe("TopMenu", () => {
    it("Mode click", () => {
        renderWithProviders(<TopMenu />);
        const activeStyle = { color: "#222" };
        const nonactiveStyle = { color: "#ddd" };
        const runButton = screen.getByRole("button", { name: "Run" });
        const pauseButton = screen.getByRole("button", { name: "Pause" });
        const clearButton = screen.getByRole("button", { name: "Clear" });
        fireEvent.click(runButton);
        expect(runButton).toHaveStyle(activeStyle);
        expect(pauseButton).toHaveStyle(nonactiveStyle);
        expect(clearButton).toHaveStyle(nonactiveStyle);
        fireEvent.click(pauseButton);
        expect(runButton).toHaveStyle(nonactiveStyle);
        expect(pauseButton).toHaveStyle(activeStyle);
        expect(clearButton).toHaveStyle(nonactiveStyle);
        fireEvent.click(clearButton);
        expect(runButton).toHaveStyle(nonactiveStyle);
        expect(pauseButton).toHaveStyle(activeStyle);
        expect(clearButton).toHaveStyle(nonactiveStyle);
    });
});
