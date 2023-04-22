import { colorSelectior, setColor } from "../../store/configReduser";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MainContainer from "../styled/MainContainer";
import BrightnessSlider from "./BrightnessSlider";
import ColorMap from "./ColorMap";
import FixedColorPicker from "./FixedColorPicker";

const MapContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    min-width: 150px;
`;

const ColorIndicator = styled.div`
    width: 100%;
    height: 15px;
    margin-top: 5px;
    user-select: none;
`;

const FixPickerContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-top: 5px;
    user-select: none;
`;

const ColorPicker = (props: React.HTMLAttributes<HTMLDivElement>) => {
    const color = useSelector(colorSelectior);
    const [mapColor, setMapColor] = useState<string>("#ff0000");
    const dispatch = useDispatch();
    const onChangeColor = useCallback(
        (color: string) => {
            dispatch(setColor(color));
        },
        [dispatch]
    );

    return (
        <MainContainer {...props}>
            <MapContainer>
                <ColorMap onChangeColor={setMapColor} />
                <BrightnessSlider color={mapColor} onChangeColor={onChangeColor} />
            </MapContainer>
            <ColorIndicator style={{ backgroundColor: color }} />

            <FixPickerContainer>
                <FixedColorPicker color="#ff0000" />
                <FixedColorPicker color="#ffff00" />
                <FixedColorPicker color="#00ff00" />
                <FixedColorPicker color="#00ffff" />
                <FixedColorPicker color="#0000ff" />
                <FixedColorPicker color="#ff00ff" />
            </FixPickerContainer>
        </MainContainer>
    );
};

export default ColorPicker;
