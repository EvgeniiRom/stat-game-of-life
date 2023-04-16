import styled from "styled-components";

const MenuContainer = styled.div`
    background: #333;
    margin: 0 auto;
    box-shadow: 0px 16px 30px 0px #200;
    display: grid;
    grid-template-columns: auto auto auto auto;
    row-gap: 5px;
    min-width: calc(580px - 20px);
    width: fit-content;
    padding: 10px;
`;

export default MenuContainer;
