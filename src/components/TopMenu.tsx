import React, { ChangeEvent, useState } from "react";
import Button from "./styled/Button";
import TopMenuContainer from "./styled/TopMenuContainer";
import Label from "./styled/Label";
import TextField from "./styled/TextField";
import LogoutButton from "./styled/LogoutButton";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout, playerNameSelector } from "../store/sessionReduser";

export type ModeButtonType = "run" | "pause" | "clear" | "random";

export interface TopMenuProps {
    active?: ModeButtonType;
    onClick?: (type: ModeButtonType) => void;
    onRandomClick?: (value: number) => void;
    text?: string;
}

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`;

const TopMenu = (props: TopMenuProps) => {
    const { active, onClick = () => undefined, onRandomClick = () => undefined, text = "" } = props;

    const [random, setRandom] = useState<string>("50%");
    const dispatch = useDispatch();
    const playerName = useSelector(playerNameSelector);

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRandom(event.target.value);
    };

    const matchResult: string | undefined = random.match(/^\d+%?$/)?.[0];
    const randomValue: number = matchResult === undefined ? 101 : parseInt(matchResult);
    const validRandom = randomValue <= 100;

    const onRandomButtonClick = () => {
        if (validRandom) {
            onRandomClick(randomValue);
        }
    };

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <TopMenuContainer>
            <Button
                onClick={() => {
                    onClick("run");
                }}
                active={active === "run"}
            >
                Run
            </Button>
            <Button
                onClick={() => {
                    onClick("pause");
                }}
                active={active === "pause"}
            >
                Pause
            </Button>
            <Button
                onClick={() => {
                    onClick("clear");
                }}
                active={active === "clear"}
            >
                Clear
            </Button>
            <Label>{text}</Label>
            <Label>Random generation: </Label>
            <TextField value={random} onChange={onTextFieldChange} error={!validRandom} />
            <Button onClick={onRandomButtonClick}>Generate</Button>
            <ProfileContainer>
                <Label>{playerName}</Label>
                <LogoutButton onClick={logOut} id="logout_button" />
            </ProfileContainer>
        </TopMenuContainer>
    );
};

export default TopMenu;
