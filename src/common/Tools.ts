import { CellProps } from "../components/styled/Cell";

export interface Field {
    data: number[][];
    width: number;
    height: number;
    generation: number;
}

export const generateFieldData = (
    width: number,
    height: number,
    randomPercent = 0
): number[][] => {
    const result = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(0);
        }
        result.push(row);
    }
    fillFieldRandom(result, width, height, randomPercent);
    return result;
};

const fillFieldRandom = (
    fieldData: number[][],
    width: number,
    height: number,
    percent: number
) => {
    const count = Math.floor((width * height * percent) / 100);
    for (let r = 0; r < count; r++) {
        let deadOffset = 0;
        const rand = Math.floor(Math.random() * (width * height - r)) + 1;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (fieldData[i][j] === 0) {
                    deadOffset++;
                }
                if (rand === deadOffset) {
                    fieldData[i][j] = 1;
                    break;
                }
            }
            if (rand === deadOffset) {
                break;
            }
        }
    }
};

export const fillFieldByField = (targetField: Field, sourceField: Field) => {
    const width = Math.min(targetField.width, sourceField.width);
    const height = Math.min(targetField.height, sourceField.height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            targetField.data[i][j] = sourceField.data[i][j];
        }
    }
};

export const getEnvironment = (field: Field): number[][] => {
    const { width, height, data } = field;
    const result = generateFieldData(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (data[i][j] > 0) {
                for (let si = -1; si <= 1; si++) {
                    for (let sj = -1; sj <= 1; sj++) {
                        if (si !== 0 || sj !== 0) {
                            const row = (i + si + height) % height;
                            const cell = (j + sj + width) % width;
                            result[row][cell]++;
                        }
                    }
                }
            }
        }
    }
    return result;
};

export const generateNextGeneration = (field: Field): Field => {
    const { width, height, data, generation } = field;
    const environment = getEnvironment(field);
    const result = generateFieldData(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cellState = data[i][j];
            const cellEnv = environment[i][j];
            if (cellState === 0 && cellEnv === 3) {
                result[i][j] = 1;
            }
            if (cellState > 0 && cellEnv >= 2 && cellEnv <= 3) {
                result[i][j] = 2;
            }
        }
    }
    return { ...field, data: result, generation: generation + 1 };
};

export const generateField = (
    width: number,
    height: number,
    randomPercent = 0
): Field => {
    return {
        data: generateFieldData(width, height, randomPercent),
        width: width,
        height: height,
        generation: 0,
    };
};

export const equalMatrix = (m1: number[][], m2: number[][]): boolean => {
    if (m1.length !== m2.length) return false;
    for (let i = 0; i < m1.length; i++) {
        const row1 = m1[i];
        const row2 = m2[i];
        if (row1.length !== row2.length) return false;
        for (let j = 0; j < row1.length; j++) {
            if (row1[j] !== row2[j]) return false;
        }
    }
    return true;
};

export const getCellStateByFieldCell = (cell: number): CellProps["state"] => {
    switch (cell) {
        case 0:
            return "dead";
        case 1:
            return "young";
        case 2:
            return "old";
        default:
            throw new Error(`Нет состояния ячейки с кодом ${cell}`);
    }
};
