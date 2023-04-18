import React from "react";
import Button from "./styled/Button";
import BottomMenuContainer from "./styled/BottomMenuContainer";
import Label from "./styled/Label";
import { useDispatch, useSelector } from "react-redux";
import { sizeSelector, speedSelector, setSize, setSpeed } from "../store/gameReduser";

const BottomMenu = () => {
    const dispatch = useDispatch();
    const size = useSelector(sizeSelector);
    const speed = useSelector(speedSelector);

    return (
        <BottomMenuContainer>
            <Label>Board Size:</Label>
            <Button onClick={() => dispatch(setSize("50x30"))} active={size === "50x30"}>
                Size: 50x30
            </Button>
            <Button onClick={() => dispatch(setSize("70x50"))} active={size === "70x50"}>
                Size: 70x50
            </Button>
            <Button onClick={() => dispatch(setSize("100x80"))} active={size === "100x80"}>
                Size: 100x80
            </Button>
            <Label>Sim Speed:</Label>
            <Button onClick={() => dispatch(setSpeed(600))} active={speed === 600}>
                Slow
            </Button>
            <Button onClick={() => dispatch(setSpeed(400))} active={speed === 400}>
                Medium
            </Button>
            <Button onClick={() => dispatch(setSpeed(200))} active={speed === 200}>
                Fast
            </Button>
        </BottomMenuContainer>
    );
};

export default BottomMenu;
