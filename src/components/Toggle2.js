import {
    CheckBoxLabel,
    CheckBox,
    CheckBoxWrapper,
} from "./styles/StyledCheckBox";
const Toggle2 = ({ onToggleChange }) => {
    return (
        <div>
            <CheckBoxWrapper>
                <CheckBox
                    id="toggle"
                    type="checkbox"
                    onChange={onToggleChange}
                />
                <CheckBoxLabel htmlFor="toggle" />
            </CheckBoxWrapper>
        </div>
    );
};

export default Toggle2;
