import styled from "styled-components";

const FormContainer = styled.form`
    max-width: 300px;
    border: 2px solid black;
    padding: 20px;
    margin: 20px;
    border-radius: 4px;
    border: 2px solid tan;
    border-radius: 10px;
    background-color: #303030;
    color: whitesmoke;
    display: flex;
    /* flex-wrap: wrap; */
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input[type="number"],
    input[type="date"] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 2px solid tan;
        border-radius: 4px;
        line-height: 1.5;
    }
    & fieldset {
        padding: 10px;
        margin: 0;
    }
    & > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
`;

export default FormContainer;
