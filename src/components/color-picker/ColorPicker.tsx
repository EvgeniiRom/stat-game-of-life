import { useEffect, useState } from "react";
import styled from "styled-components";
import MainContainer from "../styled/MainContainer";
import BrightnessSlider from "./BrightnessSlider";
import ColorMap from "./ColorMap";

const ColorPickerContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    min-width: 200px;
`;

interface ColorIndicatorProps {
    color: string;
}

const ColorIndicator = styled.div<ColorIndicatorProps>`
    width: 100%;
    height: 15px;
    background-color: ${({ color }) => color};
    margin-top: 5px;
`;

interface ColorPickerProps extends React.HTMLAttributes<HTMLDivElement> {
    onChangeColor?: (color: string) => void;
    initColor?: string;
}

const ColorPicker = (props: ColorPickerProps) => {
    const { onChangeColor, initColor, ...other } = props;
    const [mapColor, setMapColor] = useState<string>(initColor ? initColor : "#ff0000");
    const [color, setColor] = useState<string>(initColor ? initColor : "#ff0000");

    useEffect(() => {
        onChangeColor && onChangeColor(color);
    }, [color, onChangeColor]);

    return (
        <MainContainer {...other}>
            <ColorPickerContainer>
                <ColorMap onChangeColor={setMapColor} />
                <BrightnessSlider color={mapColor} onChangeColor={setColor} />
            </ColorPickerContainer>
            <ColorIndicator color={color} />
        </MainContainer>
    );
};

export default ColorPicker;
