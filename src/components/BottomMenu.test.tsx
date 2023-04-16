import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import BottomMenu from "./BottomMenu";
import { renderWithProviders } from "../utils/testUtils";

describe("BottomMenu", () => {
    it("Size click", () => {
        renderWithProviders(<BottomMenu />);
        const activeStyle = { color: "#222" };
        const nonactiveStyle = { color: "#ddd" };
        const sizeButton1 = screen.getByRole("button", { name: "Size: 50x30" });
        const sizeButton2 = screen.getByRole("button", { name: "Size: 70x50" });
        const sizeButton3 = screen.getByRole("button", { name: "Size: 100x80" });
        fireEvent.click(sizeButton1);
        expect(sizeButton1).toHaveStyle(activeStyle);
        expect(sizeButton2).toHaveStyle(nonactiveStyle);
        expect(sizeButton3).toHaveStyle(nonactiveStyle);
        fireEvent.click(sizeButton2);
        expect(sizeButton1).toHaveStyle(nonactiveStyle);
        expect(sizeButton2).toHaveStyle(activeStyle);
        expect(sizeButton3).toHaveStyle(nonactiveStyle);
        fireEvent.click(sizeButton3);
        expect(sizeButton1).toHaveStyle(nonactiveStyle);
        expect(sizeButton2).toHaveStyle(nonactiveStyle);
        expect(sizeButton3).toHaveStyle(activeStyle);
    });

    it("Speed click", () => {
        renderWithProviders(<BottomMenu />);
        const activeStyle = { color: "#222" };
        const nonactiveStyle = { color: "#ddd" };
        const sizeButton1 = screen.getByRole("button", { name: "Slow" });
        const sizeButton2 = screen.getByRole("button", { name: "Medium" });
        const sizeButton3 = screen.getByRole("button", { name: "Fast" });
        fireEvent.click(sizeButton1);
        expect(sizeButton1).toHaveStyle(activeStyle);
        expect(sizeButton2).toHaveStyle(nonactiveStyle);
        expect(sizeButton3).toHaveStyle(nonactiveStyle);
        fireEvent.click(sizeButton2);
        expect(sizeButton1).toHaveStyle(nonactiveStyle);
        expect(sizeButton2).toHaveStyle(activeStyle);
        expect(sizeButton3).toHaveStyle(nonactiveStyle);
        fireEvent.click(sizeButton3);
        expect(sizeButton1).toHaveStyle(nonactiveStyle);
        expect(sizeButton2).toHaveStyle(nonactiveStyle);
        expect(sizeButton3).toHaveStyle(activeStyle);
    });
});
