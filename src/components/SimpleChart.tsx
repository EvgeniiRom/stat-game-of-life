export interface SimpleChartProps extends React.SVGAttributes<SVGElement> {
    data: number[];
    maxValue?: number;
    width: number;
    height: number;
}

const SimpleChart = (props: SimpleChartProps) => {
    const { data, maxValue, width, height, ...other } = props;

    const max: number = maxValue ? maxValue : data.reduce((a, b) => (a > b ? a : b), 0);
    const hScale = height / max;
    const wScale = 10;

    console.log(data);
    const visibleData = data.slice(-width / wScale - 1);
    console.log(visibleData);

    const path = visibleData
        .map((value, index) => `${index === 0 ? "M" : "L"} ${index * wScale} ${(max - value) * hScale}`)
        .join(" ");

    return (
        <svg width={width} height={height} {...other} xmlns="http://www.w3.org/2000/svg">
            <path d={path} fill="none" stroke="#000" />
        </svg>
    );
};

export default SimpleChart;
