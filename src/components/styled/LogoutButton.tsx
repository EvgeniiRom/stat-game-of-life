import styled from "styled-components";
import logoutIcon from "../../icons/logout.svg";

const LogoutButton = styled.button`
    background-image: url(${logoutIcon.src});
    background-size: 100% 100%;
    background-color: unset;
    border: none;
    width: 24px;
    height: 24px;
    margin: auto 5px auto auto;
`;

export default LogoutButton;
