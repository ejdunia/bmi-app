import axios from "axios";
import { useState } from "react";
import Button from "./Button";
import CancelButton from "./CancelButton";
// import Container from "./styles/Container.styled";
import FormContainer from "./styles/FormContainer.styled";
const baseURL = `http://localhost:3001/person`;

const PersonForm = () => {
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("2000-01-01");
    const [height, setHeight] = useState("");
    const [sex, setSex] = useState("");

    const handleSexChange = (e) => {
        setSex(e.target.value);
        console.log(`form value is ${e.target.value} props value is ${sex}`);
    };

    const calculateAge = (date) => {
        const now = new Date();
        date = new Date(date);
        const diff = Math.abs(now - date);
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        return age;
    };

    const calculateBMI = (weight, height) => {
        const BMI = Math.round((weight / (height / 100) ** 2) * 10) / 10;
        return BMI;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const details = {
            sex,
            date,
            weight,
            height,
            age: calculateAge(date),
            BMI: calculateBMI(weight, height),
        };
        console.table(details);
        axios.post(baseURL, details);
    };

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
                            onChange={(e) => handleSexChange(e)}
                        />
                    </label>{" "}
                    <label htmlFor="female">
                        Female
                        <input
                            type="radio"
                            id="female"
                            name="sex"
                            value="Female"
                            onChange={(e) => handleSexChange(e)}
                        />
                    </label>{" "}
                </fieldset>

                <label>
                    Date{" "}
                    <input
                        required
                        onChange={(e) => setDate(e.target.value)}
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
                            onChange={(e) => setHeight(e.target.value)}
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
                            onChange={(e) => setWeight(e.target.value)}
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
