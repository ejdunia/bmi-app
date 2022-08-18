import Button from "./Button";
import CancelButton from "./CancelButton";
// import Container from "./styles/Container.styled";
import FormContainer from "./styles/FormContainer.styled";

const PersonForm = ({
    handleSexChange,
    handleSubmit,
    height,
    weight,
    date,
    setHeight,
    setWeight,
    setDate,
}) => {
    return (
        <div>
            <FormContainer onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Sex</legend>
                    <label htmlFor="male">
                        Male
                        <input
                            type="radio"
                            id="male"
                            name="sex"
                            value="male"
                            onChange={handleSexChange}
                        />
                    </label>{" "}
                    <label htmlFor="female">
                        Female
                        <input
                            type="radio"
                            id="female"
                            name="sex"
                            value="Female"
                            onChange={handleSexChange}
                        />
                    </label>{" "}
                </fieldset>

                <label>
                    Birth Date{" "}
                    <input
                        required
                        onChange={setDate}
                        value={date}
                        type={"date"}
                    />
                </label>
                <div>
                    <label>
                        Height (cm):
                        <input
                            required
                            type={"number"}
                            min="10"
                            max="272"
                            onChange={setHeight}
                            value={height}
                        />
                    </label>
                    <label>
                        Weight (Kg):
                        <input
                            required
                            min="1"
                            max="635"
                            type={"number"}
                            onChange={setWeight}
                            value={weight}
                        />
                    </label>
                </div>
                <div>
                    <Button Primary type={"submit"} text={"Calculate"} />
                    <CancelButton
                        type={"reset"}
                        value={"reset"}
                        text={"Clear"}
                    />
                </div>
            </FormContainer>
        </div>
    );
};

export default PersonForm;
