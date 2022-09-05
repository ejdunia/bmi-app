import React, { useContext } from "react";
import BmiInfo from "../components/BmiInfo";
import DataCard from "../components/DataCard";
import PersonForm from "../components/PersonForm";
import Container from "../components/styles/Container.styled";
import InfoContainer from "../components/styles/InfoContainer";
import DataContext from "../context/DataContext";
import dbService from "../services/dbService";
import formService from "../services/formService";

const FormAndBmiPage = () => {
    const { formData, setFormData, bmiInfo, setBmiInfo } =
        useContext(DataContext);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const details = {
            height: formData.height,
            weight: formData.weight,
            age: formService.calculateAge(formData.date),
            BMI: formService.calculateBMI(formData.weight, formData.height),
            healthStatus: formService.healthStatus(
                formService.calculateBMI(formData.weight, formData.height)
            ),
        };
        setBmiInfo(details);
        console.log(details);

        setFormData({
            date: "2000-01-01",
            sex: "",
            height: 0,
            weight: 0,
            age: "",
            BMI: 0,
            healthStatus: "",
        });
    };
    return (
        <Container>
            {" "}
            <InfoContainer>
                <DataCard
                    name={"Height"}
                    value={
                        `${bmiInfo.height}` === "undefined"
                            ? 0
                            : `${bmiInfo.height} cm`
                    }
                />
                <DataCard
                    primary
                    name={"Weight"}
                    value={
                        `${bmiInfo.weight}` === "undefined"
                            ? 0
                            : `${bmiInfo.weight} Kg`
                    }
                />
                <BmiInfo
                    BMI={`${bmiInfo.BMI}` === "undefined" ? 0 : bmiInfo.BMI}
                    HealthStatus={bmiInfo.healthStatus}
                />
            </InfoContainer>
            <PersonForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Container>
    );
};

export default FormAndBmiPage;
