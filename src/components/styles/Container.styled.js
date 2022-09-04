import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    width: 90%;
    height: 90%;
    margin: auto;
    border: 2px solid red;
    align-items: center;
    overflow: scroll;
    & > * {
        flex-grow: 1;
    }
`;
export default Container;
