import HistogramTower from "./HistogramTower";

interface HistogramProps {
    data: Record<string, number>;
}

const Histogram = (props: HistogramProps) => {
    const { data } = props;

    const width = 180;
    const height = 90;

    const colors = Object.getOwnPropertyNames(data).sort();
    const max = Math.max(...Object.values(data));

    const towerWidth = width / colors.length;
    const towers = colors.map((color, i) => {
        const coords = {
            x1: i * towerWidth,
            x2: (i + 1) * towerWidth,
            y1: height,
            y2: height - (data[color] / max) * height,
        };
        return <HistogramTower key={color} coords={coords} color={color} />;
    });

    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
            {towers}
        </svg>
    );
};

export default Histogram;
