import styled from "styled-components";

const FormContainer = styled.form`
    padding: 30px;
    font: 1.5rem Ubuntu, Arial, sans-serif;
    font-weight: 400;
    height: 90%;
    min-height: fit-content;
    max-width: 650px;
    border-radius: 10px;
    background-color: #f8debd;
    color: #1e293b;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-evenly;
    & > * {
        height: fit-content;
        flex-grow: 1;
    }
    input[type="number"],
    input[type="date"] {
        display: flex;
        flex-direction: column;
        font-size: 1.5rem;
        width: 100%;
        min-height: 60px;
        padding: 7px 5px;
        margin: 10px 0;
        box-sizing: border-box;
        border: 2px solid tan;
        border-radius: 4px;
        line-height: 2;
        flex-grow: 1;
    }

    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
        drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

export default FormContainer;
