import { animated, useSpring } from "@react-spring/web";

interface HistogramTowerCoords {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

interface HistogramTowerProps {
    coords: HistogramTowerCoords;
    color: string;
    disableStartAnimation?: boolean;
}

const HistogramTower = (props: HistogramTowerProps) => {
    const { coords, color, disableStartAnimation = false } = props;
    const { x1, x2, y1, y2 } = coords;
    const sy = disableStartAnimation ? y2 : y1;

    const [springs] = useSpring(
        {
            from: { d: `M${x1} ${y1} L${x1} ${sy} L${x2} ${sy} L${x2} ${y1}` },
            to: { d: `M${x1} ${y1} L${x1} ${y2} L${x2} ${y2} L${x2} ${y1}` },
        },
        [x1, x2, y1, y2, sy]
    );

    return <animated.path key={color} fill={color} {...springs} />;
};

export default HistogramTower;
