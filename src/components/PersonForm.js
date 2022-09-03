import Button from "./Button";
import CancelButton from "./CancelButton";
// import Container from "./styles/Container.styled";
import FormContainer from "./styles/FormContainer.styled";

const PersonForm = ({
    // handleSexChange,
    formData,
    handleSubmit,
    handleChange,
}) => {
    return (
        <div>
            <FormContainer onSubmit={handleSubmit}>
                {/* <fieldset>
                    <legend>Sex</legend>
                    <label htmlFor="male">
                        Male
                        <input
                            type="radio"
                            id="male"
                            name="sex"
                            value="male"
                            onChange={handleChange}
                        />
                    </label>{" "}
                    <label htmlFor="female">
                        Female
                        <input
                            type="radio"
                            id="female"
                            name="sex"
                            value="Female"
                            onChange={handleChange}
                        />
                    </label>{" "}
                </fieldset> */}

                <label>
                    Birth Date{" "}
                    <input
                        required
                        value={formData?.date}
                        type={"date"}
                        name="date"
                        onChange={handleChange}
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
                            value={formData?.height}
                            name="height"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Weight (Kg):
                        <input
                            required
                            min="1"
                            max="635"
                            type={"number"}
                            value={formData?.weight}
                            name="weight"
                            onChange={handleChange}
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
