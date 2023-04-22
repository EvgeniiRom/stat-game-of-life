import React from "react";
import styled from "styled-components";

const MapContainer = styled.div`
    position: relative;
    flex-grow: 1;
`;

const RGBgradient = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
`;

const GrayGradient = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#7770, #777f);
`;

const getGreen = (hP: number, vP: number): number => {
    const half = Math.floor(Math.min(1, (hP * 6) % 3) * 255);
    const result = hP % 1 < 0.5 ? half : 255 - half;
    return result - Math.floor((result - 127) * vP);
};

const colorHex = (n: number) => ("0" + n.toString(16)).slice(-2);

export const getColorByMap = (x: number, y: number, width: number, height: number): string => {
    const hP = x / width;
    const vP = y / height;
    const r = getGreen(((3 * x + width) / (width * 3)) % 1, vP);
    const g = getGreen(hP, vP);
    const b = getGreen(((3 * x + 2 * width) / (width * 3)) % 1, vP);
    return "#" + colorHex(r) + colorHex(g) + colorHex(b);
};

interface ColorMapProps extends React.HTMLAttributes<HTMLDivElement> {
    onChangeColor: (color: string) => void;
}

const ColorMap = (props: ColorMapProps) => {
    const { onChangeColor: onColorChange, ...other } = props;

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const div = event.target as HTMLDivElement;
        const rects = div.getClientRects();
        const { left, top } = rects.length > 0 ? rects[0] : { left: 0, top: 0 };
        const x = event.pageX - left;
        const y = event.pageY - top;
        onColorChange(getColorByMap(x, y, div.offsetWidth, div.offsetHeight));
    };

    return (
        <MapContainer {...other}>
            <RGBgradient />
            <GrayGradient onClick={onClick} data-testid="color-map" />
        </MapContainer>
    );
};

export default ColorMap;
