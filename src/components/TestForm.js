import React, { useState } from "react";
import Container from "./styles/Container.styled";
const formData = {
    name: "",
    age: "",
    sex: "",
    weight: "",
    height: "",
    dob: "",
};

export default function TestForm() {
    const [values, setValues] = useState(formData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Sex</legend>
                    <label htmlFor="male">
                        Male
                        <input
                            type="radio"
                            id="male"
                            name="sex"
                            value="male"
                            onChange={handleInputChange}
                        />
                    </label>{" "}
                    <label htmlFor="female">
                        Female
                        <input
                            type="radio"
                            id="female"
                            name="sex"
                            value="Female"
                            onChange={handleInputChange}
                        />
                    </label>{" "}
                </fieldset>

                <label>
                    Age{" "}
                    <input
                        onChange={handleInputChange}
                        value={formData.date}
                        type={"date"}
                    />
                </label>
                <label>
                    Height:
                    <input
                        type={"number"}
                        onChange={handleInputChange}
                        value={formData.height}
                    />
                </label>
                <label>
                    Weight:
                    <input
                        type={"number"}
                        onChange={handleInputChange}
                        value={formData.weight}
                    />
                </label>
                <div>
                    <button text={"Calculate"} cles/>
                    <button type={"reset"} value={"reset"} text={"Clear"} />
                </div>
            </form>
        </Container>
    );
}
