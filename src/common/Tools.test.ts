import {
    generateField,
    generateFieldData,
    getEnvironment,
    generateNextGeneration,
    generateFieldByField,
    equalMatrix,
    fillFieldRandom,
    FieldColor,
} from "./Tools";

describe("game processes test", () => {
    describe("create field", () => {
        describe("empty", () => {
            it("5x2", () => {
                const u = undefined;
                expect(generateFieldData(5, 2)).toEqual([
                    [u, u, u, u, u],
                    [u, u, u, u, u],
                ]);
            });

            it("3x4", () => {
                const u = undefined;
                expect(generateFieldData(3, 4)).toEqual([
                    [u, u, u],
                    [u, u, u],
                    [u, u, u],
                    [u, u, u],
                ]);
            });
        });

        describe("random filled", () => {
            it("valid percent", () => {
                const getSum = (array: FieldColor[][]) =>
                    array.reduce((sum, row) => row.reduce((a, b) => a + (b ? 1 : 0), 0) + sum, 0);
                expect(getSum(fillFieldRandom(generateField(10, 10), 0, "#ff0000").data)).toBe(0);
                expect(getSum(fillFieldRandom(generateField(10, 10), 17, "#ff0000").data)).toBe(17);
                expect(getSum(fillFieldRandom(generateField(10, 10), 42, "#ff0000").data)).toBe(42);
                expect(getSum(fillFieldRandom(generateField(10, 10), 100, "#ff0000").data)).toBe(100);
                expect(getSum(fillFieldRandom(generateField(120, 40), 80, "#ff0000").data)).toBe(3840);
            });

            it("double fill", () => {
                const getSum = (array: (string | undefined)[][]) =>
                    array.reduce((sum, row) => row.reduce((a, b) => a + (b ? 1 : 0), 0) + sum, 0);
                const field = generateField(10, 10);
                const field2 = fillFieldRandom(field, 42, "#ff0000");
                const field3 = fillFieldRandom(field2, 58, "#ff0000");
                expect(getSum(field.data)).toBe(0);
                expect(getSum(field2.data)).toBe(42);
                expect(getSum(field3.data)).toBe(100);
            });
        });

        describe("by another field", () => {
            it("source bigger", () => {
                const u = undefined;
                const r = "#ff0000";
                const g = "#00ff00";
                const source = {
                    data: [
                        [u, u, r],
                        [u, r, u],
                        [g, u, u],
                        [u, r, g],
                    ],
                    width: 3,
                    height: 4,
                    generation: 3,
                };
                const target = generateFieldByField(2, 3, source);
                expect(target).toEqual({
                    data: [
                        [u, u],
                        [u, r],
                        [g, u],
                    ],
                    width: 2,
                    height: 3,
                    generation: 3,
                });
            });

            it("source smaller", () => {
                const u = undefined;
                const r = "#ff0000";
                const source = {
                    data: [
                        [r, u],
                        [u, r],
                    ],
                    width: 2,
                    height: 2,
                    generation: 2,
                };
                const target = generateFieldByField(3, 4, source);
                expect(target).toEqual({
                    data: [
                        [r, u, u],
                        [u, r, u],
                        [u, u, u],
                        [u, u, u],
                    ],
                    width: 3,
                    height: 4,
                    generation: 2,
                });
            });
        });
    });

    describe("environment", () => {
        it("single", () => {
            const u = undefined;
            const g = "#00ff00";
            const e: string[] = [];
            const n = [g];
            const data = [
                [u, u, u, u, u],
                [u, u, u, u, u],
                [u, u, g, u, u],
                [u, u, u, u, u],
                [u, u, u, u, u],
            ];
            expect(getEnvironment({ data, generation: 0, width: 5, height: 5 })).toEqual([
                [e, e, e, e, e],
                [e, n, n, n, e],
                [e, n, e, n, e],
                [e, n, n, n, e],
                [e, e, e, e, e],
            ]);
        });

        it("double", () => {
            const u = undefined;
            const b = "#0000ff";
            const e: string[] = [];
            const n = [b];
            const d = [b, b];
            const data = [
                [u, u, u, u, u, u],
                [u, u, u, u, u, u],
                [u, u, b, u, u, u],
                [u, u, u, b, u, u],
                [u, u, u, u, u, u],
            ];
            expect(getEnvironment({ data, generation: 0, width: 6, height: 5 })).toEqual([
                [e, e, e, e, e, e],
                [e, n, n, n, e, e],
                [e, n, n, d, n, e],
                [e, n, d, n, n, e],
                [e, e, n, n, n, e],
            ]);
        });
    });

    describe("next reneration", () => {
        it("empty", () => {
            const field = generateField(6, 5);
            expect(generateNextGeneration(field)).toEqual({
                ...field,
                generation: field.generation + 1,
            });
        });

        it("circle", () => {
            const u = undefined;
            const b = "#0000ff";
            const state1 = [
                [u, u, u, u, u, u],
                [u, u, u, u, u, u],
                [u, b, b, b, u, u],
                [u, u, u, u, u, u],
                [u, u, u, u, u, u],
            ];
            const state2 = [
                [u, u, u, u, u, u],
                [u, u, b, u, u, u],
                [u, u, b, u, u, u],
                [u, u, b, u, u, u],
                [u, u, u, u, u, u],
            ];
            const field0 = { data: state1, width: 6, height: 5, generation: 0 };
            const field1 = { data: state2, width: 6, height: 5, generation: 1 };
            const field2 = { data: state1, width: 6, height: 5, generation: 2 };
            expect(generateNextGeneration(field0)).toEqual(field1);
            expect(generateNextGeneration(field1)).toEqual(field2);
        });
    });

    describe("matrix equal", () => {
        const a = [
            [undefined, "#ff0000", "#ff00ff"],
            ["#ff0000", undefined, "#ff00ff"],
        ];
        const b = [
            [undefined, "#ff0000", "#ff00ff"],
            ["#ff0000", undefined, "#ff00ff"],
        ];
        const c = [
            [undefined, "#ff0000", "#ff00ff"],
            ["#ff0000", undefined, undefined],
        ];
        const d = [[undefined, "#ff0000", "#ff00ff"]];
        const e = [[undefined, "#ff0000", "#ff00ff"]];
        expect(equalMatrix(a, b)).toBe(true);
        expect(equalMatrix(a, c)).toBe(false);
        expect(equalMatrix(b, c)).toBe(false);
        expect(equalMatrix(b, d)).toBe(false);
        expect(equalMatrix(c, d)).toBe(false);
        expect(equalMatrix(d, e)).toBe(true);
    });
});
