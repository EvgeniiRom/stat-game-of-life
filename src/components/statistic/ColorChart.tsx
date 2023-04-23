import { colorStatisticSelector } from "@/store/statisticReduser";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MainContainer from "../styled/MainContainer";
import Histogram from "./Histogram";

const ColorChartContainer = styled(MainContainer)`
    border-radius: 15px 0 0 15px;
    margin: auto 0px auto auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const ColorChart = () => {
    const data = useSelector(colorStatisticSelector);
    return (
        <ColorChartContainer>
            <Histogram data={data} />
        </ColorChartContainer>
    );
};

export default ColorChart;
