// import React, { useState } from "react";
import BmiInfo from "./components/BmiInfo";
import DataCard from "./components/DataCard";
// import LoginPage from "./components/LoginPage";
import PersonForm from "./components/PersonForm";
import { Doughnut } from "react-chartjs-2";
import InfoContainer from "./components/styles/InfoContainer";
import MeasurementDiv from "./components/styles/MeasurementDiv";
import QuotesCard from "./components/QuotesCard";
import FlexColumn from "./components/styles/FlexColumn";
import { Line } from "react-chartjs-2";
import ChartContainer from "./components/styles/ChartContainer";
import Container from "./components/styles/Container.styled";
import DashboardContainer from "./components/styles/DashboardContainer";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from "chart.js";
import MainContainer from "./components/styles/MainContainer";
import FoodTrackerBox from "./components/styles/FoodTrackerBox";
import SearchBar from "./components/SearchBar";

// const baseURL = `http://localhost:3001/person`;
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);

export const pieChartData = {
    labels: ["Protien", "Carbs", "Fat"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 13],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Weekly Nutrition Tracker",
        },
    },
};

// here i can map the last 7 days chart for calories and stuff
const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            // the data is just an array like data : [1, 2, 3, etc]
            data: [11, 27, 13, 4, 15, 26, 14],

            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: [14, 15, 17, 12, 16, 19, 12],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};
const App = () => {
    const quotes = [
        " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        "I and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ];

    return (
        <>
            <MainContainer>
                <DashboardContainer>
                    <FlexColumn>
                        <InfoContainer>
                            <MeasurementDiv>
                                <DataCard name={"Height"} value={`${109} cm`} />
                                <DataCard
                                    primary
                                    name={"Weight"}
                                    value={`${80} Kg`}
                                />
                            </MeasurementDiv>
                            <BmiInfo />
                        </InfoContainer>

                        <ChartContainer>
                            <Doughnut
                                data={pieChartData}
                                options={{ maintainAspectRatio: false }}
                            />
                        </ChartContainer>
                        <ChartContainer>
                            <Line options={options} data={data} />
                        </ChartContainer>
                    </FlexColumn>

                    <FlexColumn>
                        <Container>
                            <PersonForm />
                            <div>
                                <QuotesCard quote={quotes[0]} />
                                <QuotesCard primary quote={quotes[1]} />
                            </div>
                        </Container>
                        <FoodTrackerBox>
                            <SearchBar />
                        </FoodTrackerBox>
                    </FlexColumn>
                </DashboardContainer>
            </MainContainer>
        </>
    );
};

export default App;
