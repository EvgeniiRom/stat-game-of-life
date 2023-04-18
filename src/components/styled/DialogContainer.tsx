import styled from "styled-components";
import MainContainer from "./MainContainer";

const DialogContainer = styled(MainContainer)`
    width: fit-content;
    padding: 10px 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: auto;
`;

export default DialogContainer;
