import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import TopMenu, { ModeButtonType } from "./TopMenu";
import { renderWithProviders } from "../utils/testUtils";

describe("TopMenu", () => {
    it("Mode click", () => {
        let lastMode: ModeButtonType | undefined;

        function onModeClick(mode: ModeButtonType) {
            lastMode = mode;
        }

        renderWithProviders(<TopMenu onClick={onModeClick} />);
        const runButton = screen.getByRole("button", { name: "Run" });
        const pauseButton = screen.getByRole("button", { name: "Pause" });
        const clearButton = screen.getByRole("button", { name: "Clear" });
        fireEvent.click(runButton);
        expect(lastMode).toBe("run");
        fireEvent.click(pauseButton);
        expect(lastMode).toBe("pause");
        fireEvent.click(clearButton);
        expect(lastMode).toBe("clear");
    });

    it("Generate click", () => {
        let lastRand = 0;

        function onRandClick(value: number) {
            lastRand = value;
        }

        renderWithProviders(<TopMenu onRandomClick={onRandClick} />);
        const textbox = screen.getByRole("textbox");
        const genButton = screen.getByRole("button", { name: "Generate" });
        fireEvent.click(genButton);
        expect(lastRand).toBe(50);
        fireEvent.change(textbox, { target: { value: "20" } });
        fireEvent.click(genButton);
        expect(lastRand).toBe(20);
        fireEvent.change(textbox, { target: { value: "77%" } });
        fireEvent.click(genButton);
        expect(lastRand).toBe(77);
    });

    it("Render labels", () => {
        renderWithProviders(<TopMenu text="some text" />);
        const label1 = screen.getByText("some text");
        expect(label1).toBeInTheDocument();
    });
});
