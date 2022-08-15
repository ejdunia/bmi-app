import styled from "styled-components";
import StyledButton from "./styles/StyledButton.styled";

const StyledCancelButton = styled(StyledButton)`
    border-color: tomato;
    color: red;
    font-weight: bold;
`;

const CancelButton = ({ type, value, text }) => {
    return (
        <StyledCancelButton type={type} value={value}>
            {" "}
            {text}
        </StyledCancelButton>
    );
};
export default CancelButton;
