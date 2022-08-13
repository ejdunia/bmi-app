// import { createGlobalStyle } from "styled-components";
import Button from "./Button";
import CancelButton from "./CancelButton";
import Container from "./styles/Container.styled";

const PersonForm = ({
    onSubmit,
    handleNameInputChange,
    newName,
    handleNumInputChange,
    newNumber,
}) => {
    return (
        <Container>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Sex</legend>
                    <label htmlFor="male">
                        Male
                        <input type="radio" id="male" name="sex" value="male" />
                    </label>{" "}
                    <label htmlFor="female">
                        Female
                        <input
                            type="radio"
                            id="female"
                            name="sex"
                            value="Female"
                        />
                    </label>{" "}
                </fieldset>

                <label>
                    Age{" "}
                    <input
                        onChange={(e) => e.target.value}
                        value={""}
                        type={"date"}
                    />
                </label>
                <label>
                    Height:
                    <input
                        type={"number"}
                        onChange={handleNumInputChange}
                        value={newNumber}
                    />
                </label>
                <label>
                    Weight:
                    <input
                        type={"number"}
                        onChange={handleNumInputChange}
                        value={newNumber}
                    />
                </label>
                <div>
                    <Button Primary type={"submit"} text={"Calculate"} />
                    <CancelButton
                        type={"reset"}
                        value={"reset"}
                        text={"Clear"}
                    />
                </div>
            </form>
        </Container>
    );
};

export default PersonForm;
