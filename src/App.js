// import React, { useState } from "react";
// import Button from "./components/Button";
// import CancelButton from "./components/CancelButton";
import BmiInfo from "./components/BmiInfo";
import DataCard from "./components/DataCard";
import LoginPage from "./components/LoginPage";
import PersonForm from "./components/PersonForm";
import InfoContainer from "./components/styles/InfoContainer";
import MeasurementDiv from "./components/styles/MeasurementDiv";
import QuotesCard from "./components/QuotesCard";
import FlexColumn from "./components/styles/FlexColumn";
// import axios from "axios";
// import Container from "./components/styles/Container.styled";
// const baseURL = `http://localhost:3001/person`;

const App = () => {
    return (
        <>
            <FlexColumn>
                <InfoContainer>
                    <MeasurementDiv>
                        <DataCard name={"Height"} value={`${109} cm`} />
                        <DataCard primary name={"Weight"} value={`${80} Kg`} />
                    </MeasurementDiv>
                    <BmiInfo />
                </InfoContainer>
                <QuotesCard
                    quote={
                        " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. I and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    }
                />
                <QuotesCard
                    quote={
                        " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. I and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    }
                />

                {/* <PersonForm /> */}
                {/* <LoginPage /> */}
            </FlexColumn>
        </>
    );
};

export default App;
