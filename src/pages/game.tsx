import React, { useEffect } from "react";
import GameField from "../components/GameField";
import TopMenu from "../components/TopMenu";
import BottomMenu from "../components/BottomMenu";
import { useDispatch, useSelector } from "react-redux";
import { generationSelector, modeSelector, newGame, nextGen, setMode, speedSelector } from "@/store/gameReduser";
import { equalMatrix, generateNextGeneration } from "@/common/Tools";
import { loginSelector } from "@/store/sessionReduser";
import { useRouter } from "next/router";
import GameChart from "@/components/statistic/GameChart";
import styled from "styled-components";
import SessionChart from "@/components/statistic/SessionChart";
import ColorPicker from "@/components/color-picker/ColorPicker";
import { colorSelectior } from "@/store/configReduser";
import ColorChart from "@/components/statistic/ColorChart";

const GameContainer = styled("div")`
    display: grid;
    grid-template-areas:
        "tl top tr"
        "left center right"
        "bl base br";
    grid-template-columns: 1fr auto 1fr;
`;

const StyledColorPicker = styled(ColorPicker)`
    grid-area: right2;
    border-radius: 0 15px 15px 0;
    margin: auto auto auto 0px;
    padding: 10px;
`;

const LeftMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    grid-area: left;
    margin: 15px 0px auto auto;
`;

const RightMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    grid-area: right;
    margin: 15px auto auto 0px;
`;

const Game = () => {
    const field = useSelector(generationSelector);
    const mode = useSelector(modeSelector);
    const speed = useSelector(speedSelector);
    const isLogin = useSelector(loginSelector);
    const color = useSelector(colorSelectior);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        !isLogin && router.push("/");
    }, [isLogin, router]);

    const onCellClick = (x: number, y: number) => {
        if (mode === "pause") {
            const fieldData = field.data.map((row, i) => row.map((cell, j) => (i === x && j === y ? color : cell)));
            dispatch(newGame({ ...field, data: fieldData, generation: 0 }));
        }
    };

    useEffect(() => {
        if (mode === "run") {
            const interval = setInterval(() => {
                const nextField = generateNextGeneration(field);
                if (equalMatrix(field.data, nextField.data)) {
                    dispatch(setMode("pause"));
                } else {
                    dispatch(nextGen(nextField));
                }
            }, speed);
            return () => clearTimeout(interval);
        }
    }, [mode, speed, field, dispatch]);

    return (
        <GameContainer>
            <RightMenu>
                <GameChart />
                <StyledColorPicker />
            </RightMenu>
            <TopMenu />
            <GameField field={field.data} onCellClick={onCellClick} />
            <BottomMenu />
            <LeftMenu>
                <SessionChart />
                <ColorChart />
            </LeftMenu>
        </GameContainer>
    );
};

export default Game;
