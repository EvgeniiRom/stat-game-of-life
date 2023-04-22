import styled from "styled-components";

export interface CellProps {
    color?: string;
}

const Cell = styled.div<CellProps>`
    background-color: ${(props) => props.color};
    border: solid 1px #000;
    width: 10px;
    height: 10px;
    transition: background-color 1s;
`;

export default Cell;
