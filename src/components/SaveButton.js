import styled from "styled-components";
import StyledButton from "./styles/StyledButton.styled";
import saveImage from "../assets/save.png";

const StyledSaveButton = styled(StyledButton)`
    position: absolute;
    bottom:0;
    right:10px;
    width: 40px;
    padding: 10px;
    min-height: 5px;
    border-radius: 20px;
    margin: 5px;
    background: white;
    img {
        width: 20px;
    }
`;
const SaveButton = ({ onClick }) => {
    return (
        <StyledSaveButton onClick={onClick}>
            {" "}
            <img src={saveImage} alt="cancel" />
        </StyledSaveButton>
    );
};

export default SaveButton;
