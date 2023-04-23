import React, { ChangeEvent, useState } from "react";
import Button from "./styled/Button";
import Label from "./styled/Label";
import TextField from "./styled/TextField";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout, playerNameSelector } from "../store/sessionReduser";
import { modeSelector, setMode, clean, generationSelector, newGame } from "../store/gameReduser";
import { fillFieldRandom } from "../common/Tools";
import MenuContainer from "./styled/MenuContainer";
import { colorSelectior } from "../store/configReduser";
import logoutIcon from "../icons/logout.svg";
import simpleColorsIcon from "../icons/simpleColors.svg";
import SvgButton from "./styled/SvgButton";

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    gap: 5px;
`;

const TopMenuContainer = styled(MenuContainer)`
    grid-area: top;
    border-radius: 15px 15px 0 0;
`;

const TopMenu = () => {
    const [random, setRandom] = useState<string>("50%");

    const dispatch = useDispatch();
    const playerName = useSelector(playerNameSelector);
    const mode = useSelector(modeSelector);
    const field = useSelector(generationSelector);
    const color = useSelector(colorSelectior);

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRandom(event.target.value);
    };

    const matchResult: string | undefined = random.match(/^\d+%?$/)?.[0];
    const randomValue: number = matchResult === undefined ? 101 : parseInt(matchResult);
    const validRandom = randomValue <= 100;

    const onRandomButtonClick = (rColor?: string) => () => {
        if (validRandom) {
            if (mode === "pause") {
                dispatch(newGame(fillFieldRandom(field, randomValue, rColor)));
            }
        }
    };

    return (
        <TopMenuContainer>
            <Button onClick={() => dispatch(setMode("run"))} active={mode === "run"}>
                Run
            </Button>
            <Button onClick={() => dispatch(setMode("pause"))} active={mode === "pause"}>
                Pause
            </Button>
            <Button onClick={() => dispatch(clean())}>Clear</Button>
            <Label>Generation: {field.generation}</Label>
            <Label>Random generation: </Label>
            <TextField value={random} onChange={onTextFieldChange} error={!validRandom} />
            <ProfileContainer>
                <Button onClick={onRandomButtonClick(color)}>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" x="0" y="0" fill={color} />
                    </svg>
                </Button>
                <SvgButton icon={simpleColorsIcon.src} onClick={onRandomButtonClick()} />
            </ProfileContainer>
            <ProfileContainer>
                <Label>{playerName}</Label>
                <SvgButton icon={logoutIcon.src} onClick={() => dispatch(logout())} />
            </ProfileContainer>
        </TopMenuContainer>
    );
};

export default TopMenu;
