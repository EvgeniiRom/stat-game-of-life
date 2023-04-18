import React, { useEffect } from "react";
import GameField from "../components/GameField";
import TopMenu from "../components/TopMenu";
import BottomMenu from "../components/BottomMenu";
import { useDispatch, useSelector } from "react-redux";
import { addGen, lastGenerationSelector, modeSelector, modGen, setMode, speedSelector } from "@/store/gameReduser";
import { equalMatrix, generateNextGeneration } from "@/common/Tools";
import { loginSelector } from "@/store/sessionReduser";
import { useRouter } from "next/router";
import GameChart from "@/components/statistic/GameChart";
import styled from "styled-components";
import SessionChart from "@/components/statistic/SessionChart";

const GameContainer = styled("div")`
    display: grid;
    grid-template-areas:
        "tl top tr"
        "left center right"
        "bl base br";
    grid-template-columns: 1fr auto 1fr;
`;

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
            const interval = setInterval(() => {
                const nextGen = generateNextGeneration(field);
                if (equalMatrix(field.data, nextGen.data)) {
                    dispatch(setMode("pause"));
                } else {
                    dispatch(addGen(nextGen));
                }
            }, speed);
            return () => clearTimeout(interval);
        }
    }, [mode, speed, field, dispatch]);

    return (
        <GameContainer>
            <GameChart />
            <TopMenu />
            <GameField field={field.data} onCellClick={onCellClick} />
            <BottomMenu />
            <SessionChart />
        </GameContainer>
    );
};

export default Game;
