export interface Field {
    data: (string | undefined)[][];
    width: number;
    height: number;
    generation: number;
}

export const generateFieldData = (width: number, height: number, randomPercent = 0): (string | undefined)[][] => {
    const result = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(undefined);
        }
        result.push(row);
    }
    fillFieldRandom(result, width, height, randomPercent);
    return result;
};

const fillFieldRandom = (fieldData: (string | undefined)[][], width: number, height: number, percent: number) => {
    const count = Math.floor((width * height * percent) / 100);
    for (let r = 0; r < count; r++) {
        let deadOffset = 0;
        const rand = Math.floor(Math.random() * (width * height - r)) + 1;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (fieldData[i][j] === undefined) {
                    deadOffset++;
                }
                if (rand === deadOffset) {
                    fieldData[i][j] = getRandom();
                    break;
                }
            }
            if (rand === deadOffset) {
                break;
            }
        }
    }
};

export const generateFieldByField = (width: number, height: number, sourceField: Field): Field => {
    const targetField = generateField(width, height);
    const minWidth = Math.min(targetField.width, sourceField.width);
    const minHeight = Math.min(targetField.height, sourceField.height);
    for (let i = 0; i < minHeight; i++) {
        for (let j = 0; j < minWidth; j++) {
            targetField.data[i][j] = sourceField.data[i][j];
        }
    }
    targetField.generation = sourceField.generation;
    return targetField;
};

const initEmptyMatrix = (width: number, height: number): string[][][] => {
    const result = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push([]);
        }
        result.push(row);
    }
    return result;
};

export const getEnvironment = (field: Field): string[][][] => {
    const { width, height, data } = field;
    const result = initEmptyMatrix(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cellValue = data[i][j];
            if (cellValue !== undefined) {
                for (let si = -1; si <= 1; si++) {
                    for (let sj = -1; sj <= 1; sj++) {
                        if (si !== 0 || sj !== 0) {
                            const row = (i + si + height) % height;
                            const cell = (j + sj + width) % width;
                            result[row][cell].push(cellValue);
                        }
                    }
                }
            }
        }
    }
    return result;
};

const getChild = (p: string[]): string => {
    let r = "#";
    for (let i = 0; i < 3; i++) {
        const k = Math.floor(Math.random() * p.length);
        r += p[k].substring(1 + i * 2, 3 + i * 2);
    }
    return r;
};

const getRandom = () => {
    return getChild(["#ff00ff", "#ffff00", "#00ffff"]);
};

export const generateNextGeneration = (field: Field): Field => {
    const { width, height, data, generation } = field;
    const environment = getEnvironment(field);
    const result = generateFieldData(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cellState = data[i][j];
            const cellEnv = environment[i][j];
            if (!cellState && cellEnv.length === 3) {
                result[i][j] = getChild(cellEnv);
            }
            if (cellState && cellEnv.length >= 2 && cellEnv.length <= 3) {
                result[i][j] = cellState;
            }
        }
    }
    return { ...field, data: result, generation: generation + 1 };
};

export const generateField = (width: number, height: number, randomPercent = 0): Field => {
    return {
        data: generateFieldData(width, height, randomPercent),
        width: width,
        height: height,
        generation: 0,
    };
};

export const equalMatrix = (m1: (string | undefined)[][], m2: (string | undefined)[][]): boolean => {
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
