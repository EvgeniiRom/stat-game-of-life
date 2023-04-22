import { setColor } from "../../store/configReduser";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

interface ColorPickerProps {
    color: string;
}

const ColorPicker = styled.div<ColorPickerProps>`
    width: 10px;
    height: 10px;
    background-color: ${({ color }) => color};
`;

const FixedColorPicker = (props: React.ComponentProps<typeof ColorPicker>) => {
    const dispatch = useDispatch();

    return (
        <ColorPicker
            {...props}
            onClick={() => {
                dispatch(setColor(props.color));
            }}
        />
    );
};

export default FixedColorPicker;
