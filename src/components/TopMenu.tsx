import React, { ChangeEvent, useState } from "react";
import Button from "./styled/Button";
import Label from "./styled/Label";
import TextField from "./styled/TextField";
import LogoutButton from "./styled/LogoutButton";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout, playerNameSelector } from "../store/sessionReduser";
import { modeSelector, setMode, clean, generationSelector, newGame } from "../store/gameReduser";
import { generateField } from "../common/Tools";
import MenuContainer from "./styled/MenuContainer";

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
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

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRandom(event.target.value);
    };

    const matchResult: string | undefined = random.match(/^\d+%?$/)?.[0];
    const randomValue: number = matchResult === undefined ? 101 : parseInt(matchResult);
    const validRandom = randomValue <= 100;

    const onRandomButtonClick = () => {
        if (validRandom) {
            if (mode === "pause") {
                dispatch(newGame(generateField(field.width, field.height, randomValue)));
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
            <Button onClick={onRandomButtonClick}>Generate</Button>
            <ProfileContainer>
                <Label>{playerName}</Label>
                <LogoutButton onClick={() => dispatch(logout())} id="logout_button" />
            </ProfileContainer>
        </TopMenuContainer>
    );
};

export default TopMenu;
