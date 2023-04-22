import { getColorByMap } from "./ColorMap";

describe("ColorMap", () => {
    it("base colors", () => {
        expect(getColorByMap(0, 0, 600, 600)).toBe("#ff0000");
        expect(getColorByMap(100, 0, 600, 600)).toBe("#ffff00");
        expect(getColorByMap(200, 0, 600, 600)).toBe("#00ff00");
        expect(getColorByMap(300, 0, 600, 600)).toBe("#00ffff");
        expect(getColorByMap(400, 0, 600, 600)).toBe("#0000ff");
        expect(getColorByMap(500, 0, 600, 600)).toBe("#ff00ff");
        expect(getColorByMap(600, 0, 600, 600)).toBe("#ff0000");
        expect(getColorByMap(600, 0, 600, 600)).toBe("#ff0000");
    });
    it("gray", () => {
        const gray = "#7f7f7f";
        expect(getColorByMap(0, 600, 600, 600)).toBe(gray);
        expect(getColorByMap(100, 600, 600, 600)).toBe(gray);
        expect(getColorByMap(200, 600, 600, 600)).toBe(gray);
        expect(getColorByMap(300, 600, 600, 600)).toBe(gray);
        expect(getColorByMap(400, 600, 600, 600)).toBe(gray);
        expect(getColorByMap(500, 600, 600, 600)).toBe(gray);
        expect(getColorByMap(600, 600, 600, 600)).toBe(gray);
        expect(getColorByMap(600, 600, 600, 600)).toBe(gray);
    });
});
