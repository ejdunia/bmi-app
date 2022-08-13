import StyledButton from "./styles/StyledButton.styled";
const Button = ({ type, text }) => {
    return <StyledButton type={type}>{text}</StyledButton>;
};
export default Button;
