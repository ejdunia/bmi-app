import styled from "styled-components";

const FormContainer = styled.form`
    min-width: 250px;
    padding: 20px;
    border-radius: 10px;
    background-color: #f8debd;
    color: #1e293b;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;

    input[type="number"],
    input[type="date"] {
        width: 100%;
        padding: 5px 10px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 2px solid tan;
        border-radius: 4px;
        line-height: 1.5;
    }
    & fieldset {
        margin: 0;
    }
    & > div {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
        drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

export default FormContainer;
