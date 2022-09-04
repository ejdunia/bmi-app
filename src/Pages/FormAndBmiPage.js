import React, { useContext } from "react";
import BmiInfo from "../components/BmiInfo";
import DataCard from "../components/DataCard";
import PersonForm from "../components/PersonForm";
import Container from "../components/styles/Container.styled";
import InfoContainer from "../components/styles/InfoContainer";
import DataContext from "../context/DataContext";


const FormAndBmiPage = () => {
    const { formData, setFormData, bmiInfo, setBmiInfo } =
        useContext(DataContext);
    return (
        <Container>
            {" "}
            <InfoContainer>
                <DataCard
                    name={"Height"}
                    value={
                        `${bmiInfo.height}` === "undefined"
                            ? 0
                            : `${bmiInfo.height} Kg`
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
                />
            </InfoContainer>
            <PersonForm />
        </Container>
    );
};

export default FormAndBmiPage;
