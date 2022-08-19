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
                    id="checkbox"
                    type="checkbox"
                    onChange={onToggleChange}
                />
                <CheckBoxLabel htmlFor="checkbox" />
            </CheckBoxWrapper>
        </div>
    );
};

export default Toggle2;
