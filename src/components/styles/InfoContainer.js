import styled from "styled-components";

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 20px;
    width: fit-content;
    min-height: fit-content;
    border-radius: 5px;
    /* outline: 1px solid red; */
    font: 1.5rem Ubuntu, Arial, sans-serif;

    box-sizing: border-box;
    overflow: scroll;
    & > div {
        flex-grow: 1;
        /* max-width: 450px; */
    }

    @media (max-height: 375px) {
        & > * {
            height: fit-content;
        }
        overflow: scroll;
    }
`;

export default InfoContainer;
