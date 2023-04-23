import styled from "styled-components";

export interface CellProps {
    color?: string;
}

const Cell = styled.div<CellProps>`
    background-color: ${(props) => props.color || "#666"};
    border: solid 1px #000;
    width: 10px;
    height: 10px;
    transition: background-color 1s;
    user-select: none;
`;

export default Cell;
