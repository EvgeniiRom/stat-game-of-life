import {
    generateField,
    generateFieldData,
    getEnvironment,
    generateNextGeneration,
    fillFieldByField,
    equalMatrix,
    getCellStateByFieldCell,
} from "./Tools";

describe("game processes test", () => {
    describe("create field", () => {
        describe("empty", () => {
            it("5x2", () => {
                expect(generateFieldData(5, 2)).toEqual([
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]);
            });

            it("3x4", () => {
                expect(generateFieldData(3, 4)).toEqual([
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ]);
            });
        });

        describe("random filled", () => {
            it("valid percent", () => {
                const getSum = (array: number[][]) => array.reduce((sum, row) => row.reduce((a, b) => a + b) + sum, 0);
                expect(getSum(generateFieldData(10, 10, 0))).toBe(0);
                expect(getSum(generateFieldData(10, 10, 17))).toBe(17);
                expect(getSum(generateFieldData(10, 10, 42))).toBe(42);
                expect(getSum(generateFieldData(10, 10, 100))).toBe(100);
                expect(getSum(generateFieldData(120, 40, 80))).toBe(3840);
            });

            it("different fields", () => {
                const getSum = (array: number[][]) => array.reduce((sum, row) => row.reduce((a, b) => a + b) + sum, 0);
                const res1 = generateFieldData(123, 45, 42);
                const res2 = generateFieldData(123, 45, 42);
                expect(getSum(res1)).toBe(2324);
                expect(getSum(res2)).toBe(2324);
                expect(res1).not.toEqual(res2);
            });
        });

        describe("by another field", () => {
            it("source bigger", () => {
                const source = {
                    data: [
                        [0, 0, 1],
                        [0, 1, 0],
                        [2, 0, 0],
                        [0, 1, 2],
                    ],
                    width: 3,
                    height: 4,
                    generation: 2,
                };
                const target = {
                    data: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                    ],
                    width: 2,
                    height: 3,
                    generation: 6,
                };
                fillFieldByField(target, source);
                expect(target).toEqual({
                    data: [
                        [0, 0],
                        [0, 1],
                        [2, 0],
                    ],
                    width: 2,
                    height: 3,
                    generation: 6,
                });
            });

            it("source smaller", () => {
                const source = {
                    data: [
                        [1, 0],
                        [0, 1],
                    ],
                    width: 2,
                    height: 2,
                    generation: 2,
                };
                const target = {
                    data: [
                        [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 2],
                        [0, 0, 1],
                    ],
                    width: 3,
                    height: 4,
                    generation: 3,
                };
                fillFieldByField(target, source);
                expect(target).toEqual({
                    data: [
                        [1, 0, 0],
                        [0, 1, 0],
                        [0, 0, 2],
                        [0, 0, 1],
                    ],
                    width: 3,
                    height: 4,
                    generation: 3,
                });
            });
        });
    });

    describe("environment", () => {
        it("single", () => {
            const data = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];
            expect(getEnvironment({ data, generation: 0, width: 5, height: 5 })).toEqual([
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
            ]);
        });

        it("double", () => {
            const data = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0],
                [0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0],
            ];
            expect(getEnvironment({ data, generation: 0, width: 6, height: 5 })).toEqual([
                [0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0, 0],
                [0, 1, 1, 2, 1, 0],
                [0, 1, 2, 1, 1, 0],
                [0, 0, 1, 1, 1, 0],
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
            const state1 = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 1, 2, 1, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
            ];
            const state2 = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0],
                [0, 0, 2, 0, 0, 0],
                [0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
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
            [1, 2, 3],
            [4, 5, 6],
        ];
        const b = [
            [1, 2, 3],
            [4, 5, 6],
        ];
        const c = [
            [1, 2, 3],
            [4, 5, 7],
        ];
        const d = [[1, 2, 3]];
        const e = [[1, 2, 3]];
        expect(equalMatrix(a, b)).toBe(true);
        expect(equalMatrix(a, c)).toBe(false);
        expect(equalMatrix(b, c)).toBe(false);
        expect(equalMatrix(b, d)).toBe(false);
        expect(equalMatrix(c, d)).toBe(false);
        expect(equalMatrix(d, e)).toBe(true);
    });

    describe("cell state", () => {
        expect(() => getCellStateByFieldCell(-1)).toThrowError();
        expect(getCellStateByFieldCell(0)).toBe("dead");
        expect(getCellStateByFieldCell(1)).toBe("young");
        expect(getCellStateByFieldCell(2)).toBe("old");
        expect(() => getCellStateByFieldCell(3)).toThrowError();
        expect(() => getCellStateByFieldCell(123512)).toThrowError();
    });
});
