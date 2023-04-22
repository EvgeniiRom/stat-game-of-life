import { useState, useEffect } from "react";
import styled from "styled-components";

interface BrightnessGradientProps {
    color: string;
}

const BrightnessContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Slider = styled.input`
    -webkit-appearance: slider-vertical;
    width: 8px;
    padding: 0px 10px;
    margin: 0px;
`;

const BrightnessGradient = styled.div<BrightnessGradientProps>`
    width: 20px;
    height: 100%;
    background: ${({ color }) => `linear-gradient(white, ${color}, black)`};
`;

interface BrightnessSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    color: string;
    onChangeColor: (color: string) => void;
}

const colorHex = (n: number) => ("0" + n.toString(16)).slice(-2);
const brHexColor = (value: string, brightness: number) => {
    const n = Number("0x" + value);
    return colorHex(Math.floor(((brightness > 0 ? 255 - n : n) * brightness) / 100 + n));
};

const BrightnessSlider = (props: BrightnessSliderProps) => {
    const { onChangeColor: onColorChange, color, ...other } = props;

    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        const brColor =
            "#" +
            brHexColor(color.substring(1, 3), value) +
            brHexColor(color.substring(3, 5), value) +
            brHexColor(color.substring(5, 7), value);
        onColorChange(brColor);
    }, [value, color, onColorChange]);

    return (
        <BrightnessContainer {...other}>
            <BrightnessGradient color={color} />
            <Slider
                type={"range"}
                value={value}
                min={-100}
                max={100}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(parseInt(e.target.value));
                }}
                data-testid="color-slider"
            />
        </BrightnessContainer>
    );
};

export default BrightnessSlider;
