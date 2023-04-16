import styled from "styled-components";

interface LabelProps {
    size?: "small" | "medium" | "large";
}

const sizes = {
    small: "12px",
    medium: "16px",
    large: "24px",
};

const Label = styled.div<LabelProps>`
    color: #ddd;
    font-size: ${({ size = "medium" }) => sizes[size]};
    margin: auto;
`;

export default Label;
