import React, { useState } from "react";
import Button from "./components/Button";
import CancelButton from "./components/CancelButton";
// import PersonForm from "./components/PersonForm";
import Container from "./components/styles/Container.styled";

const App = () => {
    // const [persons, setPersons] = useState([]);
    // const [name, setName] = useState("");
    const [age, setAge] = useState();
    const [weight, setWeight] = useState();
    const [date, setDate] = useState();
    const [height, setHeight] = useState();
    const [sex, setSex] = useState("");

    const handleSexChange = (e) => {
        setSex(e.target.value);
        console.log(`form value is ${e.target.value} props value is ${sex}`);
    };

    const handleChange = (e) => {
        console.log(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const details = {
            sex,
        };
        console.log(details);
    };

    return (
        <div>
            {/* <PersonForm /> */}
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
                        Age{" "}
                        <input
                            onChange={handleChange}
                            value={date}
                            type={"date"}
                        />
                    </label>
                    <label>
                        Height:
                        <input
                            type={"number"}
                            onChange={handleChange}
                            value={height}
                        />
                    </label>
                    <label>
                        Weight:
                        <input
                            type={"number"}
                            onChange={handleChange}
                            value={weight}
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
        </div>
    );
};

export default App;
