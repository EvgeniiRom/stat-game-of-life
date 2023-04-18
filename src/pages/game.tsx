import React, { useEffect } from "react";
import GameField from "../components/GameField";
import TopMenu from "../components/TopMenu";
import BottomMenu from "../components/BottomMenu";
import { useDispatch, useSelector } from "react-redux";
import { addGen, lastGenerationSelector, modeSelector, modGen, setMode, speedSelector } from "@/store/gameReduser";
import { equalMatrix, generateNextGeneration } from "@/common/Tools";
import { loginSelector } from "@/store/sessionReduser";
import { useRouter } from "next/router";
import StatisticLog from "@/components/statistic/StatisticLog";

const Game = () => {
    const field = useSelector(lastGenerationSelector);
    const mode = useSelector(modeSelector);
    const speed = useSelector(speedSelector);
    const isLogin = useSelector(loginSelector);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        !isLogin && router.push("/");
    }, [isLogin, router]);

    const onCellClick = (x: number, y: number) => {
        if (mode === "pause") {
            const fieldData = field.data.map((row, i) =>
                row.map((cell, j) => (i === x && j === y ? (cell > 0 ? 0 : 1) : cell))
            );
            dispatch(modGen({ ...field, data: fieldData }));
        }
    };

    useEffect(() => {
        if (mode === "run") {
            let intervalValue = 400;
            if (speed === "slow") intervalValue = 600;
            if (speed === "fast") intervalValue = 150;
            const interval = setInterval(() => {
                const nextGen = generateNextGeneration(field);
                if (equalMatrix(field.data, nextGen.data)) {
                    dispatch(setMode("pause"));
                } else {
                    dispatch(addGen(nextGen));
                }
            }, intervalValue);
            return () => clearTimeout(interval);
        }
    }, [mode, speed, field, dispatch]);

    return (
        <>
            <StatisticLog />
            <TopMenu />
            <GameField field={field.data} onCellClick={onCellClick} />
            <BottomMenu />
        </>
    );
};

export default Game;
