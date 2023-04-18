import { statisticResultsSelector } from "@/store/statisticReduser";
import { useSelector } from "react-redux";

const StatisticLog = () => {
    const results = useSelector(statisticResultsSelector);
    return (
        <div
            style={{
                position: "absolute",
                top: "0px",
            }}
        >
            {results.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    );
};

export default StatisticLog;
