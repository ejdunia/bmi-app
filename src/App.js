import React, { useState, useEffect } from "react";
import BmiInfo from "./components/BmiInfo";
import DataCard from "./components/DataCard";
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
import NutriTable from "./components/NutriTable";
import axios from "axios";

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

const App = () => {
    const [personInfo, setPersonInfo] = useState({});
    const [nutritionData, setNutritionData] = useState([]);
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [date, setDate] = useState("2000-01-01");
    const [sex, setSex] = useState("");
    // const [labels, setLabels] = useState([]);

    const handleSexChange = (e) => {
        setSex(e.target.value);
        console.log(`form value is ${e.target.value} props value is ${sex}`);
    };
    const handleHeight = (e) => {
        setHeight(e.target.value);
        console.log(height);
    };

    const handleWeight = (e) => {
        setWeight(e.target.value);
        console.log(height);
    };
    const HandleDate = (e) => {
        setDate(e.target.value);
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
        setPersonInfo(details);
        console.table(details);
        setWeight("");
        setHeight("");
        setDate("2000-01-01");
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3001/nutrition_data`
                );
                setNutritionData(res.data[0]);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const pieChartData = {
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
    // here i can map the last 7 days chart for calories and stuff
    const labels = ["sd", "February", "March", "April", "May", "June", "July"];

    const data = {
        labels,
        datasets: [
            {
                label: "Protien",
                data: [11, 27, 13, 4, 15, 26, 14],

                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Carbs",
                data: [14, 15, 17, 12, 16, 19, 12],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
                label: "Fat",
                data: [24, 25, 27, 12, 36, 15, 19],
                borderColor: "rgb(255, 206, 86, 1)",
                backgroundColor: "rgba(255, 206, 86, 1)",
            },
        ],
    };

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
                                <DataCard
                                    name={"Height"}
                                    value={
                                        `${personInfo.height}` === "undefined"
                                            ? 0
                                            : `${personInfo.height} cm`
                                    }
                                />
                                <DataCard
                                    primary
                                    name={"Weight"}
                                    value={
                                        `${personInfo.weight}` === "undefined"
                                            ? 0
                                            : `${personInfo.weight} Kg`
                                    }
                                />
                            </MeasurementDiv>
                            <BmiInfo
                                BMI={
                                    `${personInfo.BMI}` === "undefined"
                                        ? 0
                                        : personInfo.BMI
                                }
                            />
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
                            <PersonForm
                                handleSexChange={handleSexChange}
                                handleSubmit={handleSubmit}
                                weight={weight}
                                height={height}
                                date={date}
                                setDate={HandleDate}
                                setHeight={handleHeight}
                                setWeight={handleWeight}
                            />
                            <div>
                                <QuotesCard quote={quotes[0]} />
                                <QuotesCard primary quote={quotes[1]} />
                            </div>
                        </Container>
                        <FoodTrackerBox>
                            <SearchBar />
                            <NutriTable />
                        </FoodTrackerBox>
                    </FlexColumn>
                </DashboardContainer>
            </MainContainer>
        </>
    );
};

export default App;
