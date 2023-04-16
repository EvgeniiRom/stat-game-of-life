import React from "react";
import Button from "./styled/Button";
import BottomMenuContainer from "./styled/BottomMenuContainer";
import Label from "./styled/Label";

export type SpeedButtonType = "slow" | "medium" | "fast";
export type SizeButtonType = "50x30" | "70x50" | "100x80";

export interface BottomMenuProps {
    activeSpeed?: SpeedButtonType;
    activeSize?: SizeButtonType;
    onSpeedClick?: (type: SpeedButtonType) => void;
    onSizeClick?: (type: SizeButtonType) => void;
}

const BottomMenu = (props: BottomMenuProps) => {
    const { activeSpeed, activeSize, onSpeedClick = () => undefined, onSizeClick = () => undefined } = props;

    return (
        <BottomMenuContainer>
            <Label>Board Size:</Label>
            <Button
                onClick={() => {
                    onSizeClick("50x30");
                }}
                active={activeSize === "50x30"}
            >
                Size: 50x30
            </Button>
            <Button
                onClick={() => {
                    onSizeClick("70x50");
                }}
                active={activeSize === "70x50"}
            >
                Size: 70x50
            </Button>
            <Button
                onClick={() => {
                    onSizeClick("100x80");
                }}
                active={activeSize === "100x80"}
            >
                Size: 100x80
            </Button>
            <Label>Sim Speed:</Label>
            <Button
                onClick={() => {
                    onSpeedClick("slow");
                }}
                active={activeSpeed === "slow"}
            >
                Slow
            </Button>
            <Button
                onClick={() => {
                    onSpeedClick("medium");
                }}
                active={activeSpeed === "medium"}
            >
                Medium
            </Button>
            <Button
                onClick={() => {
                    onSpeedClick("fast");
                }}
                active={activeSpeed === "fast"}
            >
                Fast
            </Button>
        </BottomMenuContainer>
    );
};

export default BottomMenu;
