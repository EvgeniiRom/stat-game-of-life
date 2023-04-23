import styled from "styled-components";
import Button from "./Button";

interface SvgButtonProps {
    icon: string;
}

const SvgButton = styled(Button)<SvgButtonProps>`
    background-image: url(${({ icon }) => icon});
    background-size: 80% 80%;
    background-color: unset;
    background-position: center;
    background-repeat: no-repeat;
`;

export default SvgButton;
