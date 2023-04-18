import styled from "styled-components";

export interface MinMaxAvrProps {
    data: number[];
}

const MinMaxAvrContainer = styled("div")`
    display: grid;
    grid-template-columns: auto auto;
    gap: 5px;
    color: #ddd;
`;

const MinMaxAvr = (props: MinMaxAvrProps) => {
    const { data } = props;
    const count = data.length;
    const max = count > 0 ? Math.max(...data).toFixed(2) : "-";
    const min = count > 0 ? Math.min(...data).toFixed(2) : "-";
    const avr = count > 0 ? (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2) : "-";
    return (
        <MinMaxAvrContainer>
            <span>Count: </span>
            <span>{count}</span>
            <span>Min: </span>
            <span>{min}</span>
            <span>Max: </span>
            <span>{max}</span>
            <span>Avr: </span>
            <span>{avr}</span>
        </MinMaxAvrContainer>
    );
};

export default MinMaxAvr;
