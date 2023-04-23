import styled from "styled-components";

interface TextFieldProps {
    error?: boolean;
}

const TextField = styled.input<TextFieldProps>`
    background-color: ${(props) => (props.error ? "#faa" : "#222")};
    color: ${(props) => (props.error ? "#222" : "#ddd")};
    transition: color 0.3s;
    transition: background-color 0.3s;
    display: inline-block;
    width: 132px;
    height: 22px;
    font-size: 16px;
    border-radius: 5px;
    margin: auto;
`;

export default TextField;
