import { gameStatisticSelector } from "@/store/statisticReduser";
import { useSelector } from "react-redux";
import SimpleChart, { SimpleChartProps } from "../SimpleChart";

type GameChartProps = Omit<SimpleChartProps, "data">;

const GameChart = (props: GameChartProps) => {
    const data = useSelector(gameStatisticSelector);
    return <SimpleChart data={data} {...props} />;
};

export default GameChart;
