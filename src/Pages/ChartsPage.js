import Container from "../components/styles/Container.styled";
import React, { useContext } from "react";
import DataContext from "../context/DataContext";
import ChartContainer from "../components/styles/ChartContainer";
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
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

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

const options = {
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

const ChartsPage = () => {
    const { pieData, labels } = useContext(DataContext);
    const pieChartData = {
        labels: ["Calories", "Fat", "Protien"],
        datasets: [
            {
                label: "# of Votes",

                data: pieData,
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
    // todo map the daily total content for fat carbs etc to data below
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

    return (
        <Container>
            {/* Charts page */}
            <ChartContainer>
                <span></span>
                {pieData?.length !== 1 && (
                    <Doughnut
                        data={pieChartData}
                        options={{ maintainAspectRatio: false }}
                    />
                )}
            </ChartContainer>
            <ChartContainer>
                <span></span>
                <Line options={options} data={data} />
                {/* // maek a weekly table tracker */}
            </ChartContainer>
        </Container>
    );
};

export default ChartsPage;
