import React from "react";
import styled from "styled-components";
import Cell from "./styled/Cell";
import GameFieldRow from "./styled/GameFieldRow";
import MainContainer from "./styled/MainContainer";

interface GameFieldProps {
    field: (string | undefined)[][];
    onCellClick?: (x: number, y: number) => void;
}

const GameFieldContainer = styled(MainContainer)`
    grid-area: center;
    width: fit-content;
    margin: 0 auto;
    padding: 10px 20px;
    border-radius: 15px;
    z-index: 1;
`;

const GameField = (props: GameFieldProps) => {
    const { field, onCellClick = () => undefined } = props;

    return (
        <GameFieldContainer>
            {field.map((row, i) => (
                <GameFieldRow key={i}>
                    {row.map((cell, j) => (
                        <Cell
                            key={j}
                            color={cell}
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
