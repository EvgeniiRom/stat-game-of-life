import styled from "styled-components";

export interface CellProps {
    state: "dead" | "young" | "old";
}

const bgColors = {
    dead: "#aaa",
    young: "#f22",
    old: "#a22",
};

const Cell = styled.div<CellProps>`
    background-color: ${(props) => bgColors[props.state]};
    border: solid 1px #000;
    width: 10px;
    height: 10px;
    transition: background-color 1s;
`;

export default Cell;
