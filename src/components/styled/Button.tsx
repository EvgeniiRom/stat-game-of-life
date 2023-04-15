import styled from "styled-components";

interface ButtonProps {
    active?: boolean
}

const Button = styled.button<ButtonProps>`    
    background-color: ${props => props.active ? '#faa' : '#222'};
    color: ${props => props.active ? '#222' : '#ddd'};
    transition: color 0.3s;
    transition: background-color 0.3s;
    display: inline-block;
    width: 140px;
    height: 27px;
    font-size: 16px;
    border-radius: 5px;`

export default Button;