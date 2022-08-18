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
import NutriItem from "./components/NutriItem";
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
import StyledTable from "./components/styles/StyledTable";
import SearchBar from "./components/SearchBar";
import NutriTable from "./components/NutriTable";
import axios from "axios";
const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;

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
    const dummyData = [
        {
            id: 1,
            name: "food Name",
            calories: 0,
            serving_size_g: 0,
            fat_total_g: 0,
            fat_saturated_g: 0,
            protein_g: 0,
            sodium_mg: 0,
            potassium_mg: 0,
            cholesterol_mg: 0,
            carbohydrates_total_g: 0,
            fiber_g: 0,
            sugar_g: 0,
        },
        {
            id: 2,
            name: "food Name two",
            calories: 0,
            serving_size_g: 0,
            fat_total_g: 0,
            fat_saturated_g: 0,
            protein_g: 0,
            sodium_mg: 0,
            potassium_mg: 0,
            cholesterol_mg: 0,
            carbohydrates_total_g: 0,
            fiber_g: 0,
            sugar_g: 0,
        },
    ];
    const [personInfo, setPersonInfo] = useState({});

    const [nutriList, setNutriList] = useState([]);
    const [nutriListEmpty, setNutriListEmpty] = useState(true);
    const [nutritionData, setNutritionData] = useState([]);
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [date, setDate] = useState("2000-01-01");
    const [sex, setSex] = useState("");
    const [barOpened, setBarOpened] = useState(false);

    const [searchInput, setSearchInput] = useState("");

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const onSearchFormSubmit = (e) => {
        e.preventDefault();
        setSearchInput("");
        setBarOpened(false);
        // After form submit, do what you want with the input value
        console.log(`Form was submited with input: ${searchInput}`);
        const options = {
            method: "GET",
            url: "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition",
            params: { query: searchInput },
            headers: {
                "X-RapidAPI-Key": rapidApiKey,
                "X-RapidAPI-Host": "nutrition-by-api-ninjas.p.rapidapi.com",
            },
        };

        axios
            .request(options)
            .then((response) => {
                let exists = nutriList.some(
                    (el) => el.name === response.data[0].name
                );
                if (!exists) {
                    setNutriList(nutriList.concat(response.data));
                }

                setNutriListEmpty(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // const deleteItem = (itemname) => {
    //     // const url = `http://localhost:3001/names/${name}`;
    //     console.log(itemname);
    //     //       window.confirm(` id ${name} will be deleted`)
    //     //           ? axios.delete(url).then((response) => {
    //     //                 console.log(`${name} has been deleted`);
    //     //             })
    //     //           : alert("aborted");
    // };

    const handleSexChange = (e) => {
        setSex(e.target.value);
    };
    const handleHeight = (e) => {
        setHeight(e.target.value);
    };

    const handleWeight = (e) => {
        setWeight(e.target.value);
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
                setNutritionData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    // console.log(nutritionData);
    // console.log(nutritionData[0]);

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
    const deleteItem = (itemname) => {
        // const url = `http://localhost:3001/names/${name}`;
        console.log(itemname);
        setNutriList(nutriList.filter((item) => item.name !== itemname));

        //       window.confirm(` id ${name} will be deleted`)
        //           ? axios.delete(url).then((response) => {
        //                 console.log(`${name} has been deleted`);
        //             })
        //           : alert("aborted");
    };

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
                            <span></span>
                            <Doughnut
                                data={pieChartData}
                                options={{ maintainAspectRatio: false }}
                            />
                        </ChartContainer>
                        <ChartContainer>
                            <span></span>
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
                                <QuotesCard />
                                <QuotesCard />
                            </div>
                        </Container>
                        <FoodTrackerBox>
                            <SearchBar
                                onSearchSubmit={onSearchFormSubmit}
                                barOpened={barOpened}
                                setBarOpened={setBarOpened}
                                input={searchInput}
                                handleSearchInputChange={handleSearchInput}
                            />
                            {/* <NutriTable
                                NutriList={
                                    nutriListEmpty ? dummyData : nutriList
                                }
                            /> */}
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Fat(g)</td>
                                        <td>Carbs(g)</td>
                                        <td>Protien(g)</td>
                                        <td></td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {nutriList.map((item) => (
                                        <NutriItem
                                            key={item.name}
                                            item={item}
                                            handleDelete={() => {
                                                deleteItem(item.name);
                                            }}
                                        />
                                    ))}
                                </tbody>
                            </StyledTable>
                        </FoodTrackerBox>
                    </FlexColumn>
                </DashboardContainer>
            </MainContainer>
        </>
    );
};

export default App;
