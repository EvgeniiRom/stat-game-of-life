import { gameStatisticSelector } from "@/store/statisticReduser";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SimpleChart, { SimpleChartProps } from "./SimpleChart";
import MainContainer from "../styled/MainContainer";
import MinMaxAvr from "./MinMaxAvr";
import Label from "../styled/Label";

type GameChartProps = Omit<SimpleChartProps, "data" | "width" | "height">;

const GameChartContainer = styled(MainContainer)`
    grid-area: right;
    border-radius: 0 15px 15px 0;
    margin: auto auto auto 0px;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const GameChart = (props: GameChartProps) => {
    const data = useSelector(gameStatisticSelector);
    return (
        <GameChartContainer>
            <Label>Current game</Label>
            <SimpleChart data={data} width={120} height={40} {...props} />
            <MinMaxAvr data={data} />
        </GameChartContainer>
    );
};

export default GameChart;
