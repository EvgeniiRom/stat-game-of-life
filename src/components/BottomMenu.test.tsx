import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import BottomMenu, { SizeButtonType, SpeedButtonType } from "./BottomMenu";
import { renderWithProviders } from "../utils/testUtils";

describe("BottomMenu", () => {
    it("Size click", () => {
        let lastSize: SizeButtonType | undefined;

        function onSizeClick(size: SizeButtonType) {
            lastSize = size;
        }

        renderWithProviders(<BottomMenu onSizeClick={onSizeClick} />);
        const sizeButton1 = screen.getByRole("button", { name: "Size: 50x30" });
        const sizeButton2 = screen.getByRole("button", { name: "Size: 70x50" });
        const sizeButton3 = screen.getByRole("button", { name: "Size: 100x80" });
        fireEvent.click(sizeButton1);
        expect(lastSize).toBe("50x30");
        fireEvent.click(sizeButton2);
        expect(lastSize).toBe("70x50");
        fireEvent.click(sizeButton3);
        expect(lastSize).toBe("100x80");
    });

    it("Speed click", () => {
        let lastSpeed: SpeedButtonType | undefined;

        function onSpeedClick(speed: SpeedButtonType) {
            lastSpeed = speed;
        }

        renderWithProviders(<BottomMenu onSpeedClick={onSpeedClick} />);
        const slowButton = screen.getByRole("button", { name: "Slow" });
        const mediumButton = screen.getByRole("button", { name: "Medium" });
        const fastButton = screen.getByRole("button", { name: "Fast" });
        fireEvent.click(slowButton);
        expect(lastSpeed).toBe("slow");
        fireEvent.click(mediumButton);
        expect(lastSpeed).toBe("medium");
        fireEvent.click(fastButton);
        expect(lastSpeed).toBe("fast");
    });
});
