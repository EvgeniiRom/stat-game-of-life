import { cleanSessionStatistic, sessionStatisticSelector } from "@/store/statisticReduser";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SimpleChart, { SimpleChartProps } from "./SimpleChart";
import MainContainer from "../styled/MainContainer";
import MinMaxAvr from "./MinMaxAvr";
import Label from "../styled/Label";
import Button from "../styled/Button";

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
    const dispatch = useDispatch();
    return (
        <SessionChartContainer>
            <Label>All games</Label>
            <SimpleChart data={data} width={140} height={40} maxValue={100} {...props} />
            <MinMaxAvr data={data} />
            <Button
                onClick={() => {
                    dispatch(cleanSessionStatistic());
                }}
            >
                Clear
            </Button>
        </SessionChartContainer>
    );
};

export default SessionChart;
