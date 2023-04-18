import styled from "styled-components";
import MainContainer from "./MainContainer";

const MenuContainer = styled(MainContainer)`
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto auto auto auto;
    row-gap: 5px;
    min-width: calc(580px - 20px);
    padding: 10px;
`;

export default MenuContainer;
