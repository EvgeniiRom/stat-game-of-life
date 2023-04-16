import React from "react";
import { getCellStateByFieldCell } from "../common/Tools";
import Cell from "./styled/Cell";
import GameFieldContainer from "./styled/GameFieldContainer";
import GameFieldRow from "./styled/GameFieldRow";

interface GameFieldProps {
    field: number[][];
    onCellClick?: (x: number, y: number) => void;
}

const GameField = (props: GameFieldProps) => {
    const { field, onCellClick = () => undefined } = props;

    return (
        <GameFieldContainer>
            {field.map((row, i) => (
                <GameFieldRow key={i}>
                    {row.map((cell, j) => (
                        <Cell
                            key={j}
                            state={getCellStateByFieldCell(cell)}
                            onClick={() => {
                                onCellClick(i, j);
                            }}
                        />
                    ))}
                </GameFieldRow>
            ))}
        </GameFieldContainer>
    );
};

export default GameField;
