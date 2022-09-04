import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
    width: 90%;
    height: 90%;
    margin: auto;
    border: 2px solid red;
    align-items:center;
    justify-content: center;
    gap:30px;
    overflow: scroll;
    & > * {
        flex-grow: 1;
    }
`;
export default Container;
