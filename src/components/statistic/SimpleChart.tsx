import styled from "styled-components";

export interface SimpleChartProps extends React.SVGAttributes<SVGElement> {
    data: number[];
    maxValue?: number;
    width: number;
    height: number;
}

const ChartContainer = styled("div")`
    background: #aaa;
    border-radius: 10px;
    box-shadow: 0px 16px 30px 0px #200;
    border: solid 1px #fff;
    width: fit-content;
    margin: 10px auto;
`;

const SimpleChart = (props: SimpleChartProps) => {
    const { data, maxValue, width, height, ...other } = props;

    const max: number = maxValue ? maxValue : Math.max(...data);
    const hScale = height / max;
    const wScale = 10;
    const visibleData = data.slice(-width / wScale - 1);

    const path = visibleData
        .map((value, index) => `${index === 0 ? "M" : "L"} ${index * wScale} ${(max - value) * hScale}`)
        .join(" ");

    return (
        <ChartContainer>
            <svg width={width} height={height} {...other} xmlns="http://www.w3.org/2000/svg">
                <path d={path} fill="none" stroke="#000" />
            </svg>
        </ChartContainer>
    );
};

export default SimpleChart;
