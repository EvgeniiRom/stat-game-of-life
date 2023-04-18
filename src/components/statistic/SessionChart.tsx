import { sessionStatisticSelector } from "@/store/statisticReduser";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SimpleChart, { SimpleChartProps } from "./SimpleChart";
import MainContainer from "../styled/MainContainer";
import MinMaxAvr from "./MinMaxAvr";
import Label from "../styled/Label";

type SessionChartProps = Omit<SimpleChartProps, "data" | "width" | "height">;

const SessionChartContainer = styled(MainContainer)`
    grid-area: left;
    border-radius: 15px 0 0 15px;
    margin: auto 0px auto auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const SessionChart = (props: SessionChartProps) => {
    const data = useSelector(sessionStatisticSelector);
    return (
        <SessionChartContainer>
            <Label>All games</Label>
            <SimpleChart data={data} width={120} height={40} maxValue={100} {...props} />
            <MinMaxAvr data={data} />
        </SessionChartContainer>
    );
};

export default SessionChart;
