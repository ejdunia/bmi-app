import React, { useState, useEffect } from "react";

import chartsService from "./services/chartsService";
import dbService from "./services/dbService";
import formService from "./services/formService";

import BmiInfo from "./components/BmiInfo";
import DataCard from "./components/DataCard";
import PersonForm from "./components/PersonForm";
import { Doughnut } from "react-chartjs-2";
import InfoContainer from "./components/styles/InfoContainer";
import MeasurementDiv from "./components/styles/MeasurementDiv";
import QuotesCard from "./components/QuotesCard";
import QuotesCard2 from "./components/QuotesCard2";
import FlexColumn from "./components/styles/FlexColumn";
import { Line } from "react-chartjs-2";
import ChartContainer from "./components/styles/ChartContainer";
import Container from "./components/styles/Container.styled";
import DashboardContainer from "./components/styles/DashboardContainer";
import NutriItem from "./components/NutriItem";
import CheckboxToggle from "./components/CheckBoxToggle";
import Toggle2 from "./components/Toggle2";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainContainer from "./components/styles/MainContainer";
import FoodTrackerBox from "./components/styles/FoodTrackerBox";
import StyledTable from "./components/styles/StyledTable";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import ToggleContainer from "./components/ToggleContainer";
import SaveButton from "./components/SaveButton";
import LandingPage from "./Pages/LandingPage";
// import LoginPage from "./components/LoginPage";
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
    ];
    const [formData, setFormData] = useState({
        date: "2000-01-01",
        sex: "",
        weight: "",
        height: "",
        age: "",
        BMI: 0,
        healthStatus: "",
    });
    const [bmiInfo, setBmiInfo] = useState({});

    const [showQuote1, setShowQuote1] = useState(false);
    const [showQuote2, setShowQuote2] = useState(false);
    const [labels, setLabels] = useState([]);
    const [nutriTableList, setNutriTableList] = useState([]);
    const [nutriListEmpty, setNutriListEmpty] = useState(false);
    const [nutritionDBData, setNutritionDBData] = useState([]);
    const [barOpened, setBarOpened] = useState(false);
    const [pieData, setPieData] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        dbService.getDBData().then((response) => {
            setNutritionDBData(response);
            setNutriTableList(dbService.toDisplay(response));
            console.log(dbService.toDisplay(response));
            setPieData(
                chartsService.getPieChartData(dbService.toDisplay(response))
            );
            setLabels(chartsService.getLineChartLabels(response));
        });
    }, [pieData.length]);

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const onSearchFormSubmit = (e) => {
        e.preventDefault();
        setSearchInput("");
        setBarOpened(false);
        // After form submit, do what you want with the input value
        const options = {
            method: "GET",
            url: "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition",
            params: { query: searchInput },
            headers: {
                "X-RapidAPI-Key": rapidApiKey,
                "X-RapidAPI-Host": "nutrition-by-api-ninjas.p.rapidapi.com",
            },
        };
        const id = toast.loading("Loading...");
        axios
            .request(options)
            .then((response) => {
                if (response.data?.length === 0) {
                    toast("Nothing found, please try again");
                    toast.update(id, {
                        render: "",
                        type: "info",
                        isLoading: false,
                        autoClose: 100,
                    });
                } else {
                    let exists = nutriTableList.find(
                        (el) => el.name === response.data[0]?.name
                    );

                    if (!exists) {
                        toast.update(id, {
                            render: "Done",
                            type: "success",
                            isLoading: false,
                            autoClose: 500,
                        });
                        setNutriTableList((nutriTableList) =>
                            nutriTableList.concat(response.data)
                        );
                        // console.log(response.data);
                    } else {
                        toast.update(id, {
                            render: `${response?.data[0]?.name} already exists`,
                            type: "info",
                            isLoading: false,
                            autoClose: 500,
                        });
                    }
                }

                setNutriListEmpty(false);
            })
            .catch((error) => {
                toast(error);
                console.error(error);
            });
    };

    const calculateAge = (date) => {
        const now = new Date();
        date = new Date(date);
        const diff = Math.abs(now - date);
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        return age;
    };

    const healthStatus = (bmi) => {
        if (bmi < 18.5) {
            return `You're Underweight`;
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return `Normal Body Weight`;
        } else {
            return `You're Overweight`;
        }
    };
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
            age: calculateAge(formData.date),
            BMI: formService.calculateBMI(formData.weight, formData.height),
            healthStatus: healthStatus(
                formService.calculateBMI(formData.weight, formData.height)
            ),
        };
        setBmiInfo(details);

        console.log(details);
        console.log(bmiInfo);
        setFormData({
            date: "2000-01-01",
            sex: "",
            height: 0,
            weight: 0,
            age: "",
            BMI: 0,
            healthStatus: "",
        });
        console.log(formData);
    };

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
        <>
            <MainContainer>
                <ToastContainer />
                <DashboardContainer>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/form"
                            element={
                                <PersonForm
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                />
                            }
                        />
                        <Route path="/page3" element={"page 3"} />
                        <Route path="*" element={"error page"} />
                    </Routes>
                    <Nav />
                </DashboardContainer>
            </MainContainer>

            <MainContainer>
                <ToastContainer />

                <DashboardContainer>
                    <FlexColumn>
                        <InfoContainer>
                            <MeasurementDiv>
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
                            </MeasurementDiv>
                            <BmiInfo
                                BMI={
                                    `${bmiInfo.BMI}` === "undefined"
                                        ? 0
                                        : bmiInfo.BMI
                                }
                            />
                        </InfoContainer>

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

                            {/* maek a weekly table tracker */}
                        </ChartContainer>
                    </FlexColumn>

                    <FlexColumn>
                        <Container>
                            {true && (
                                <PersonForm
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                />
                            )}
                            <div>
                                <ToggleContainer>
                                    <CheckboxToggle
                                        onChange={() =>
                                            setShowQuote1(!showQuote1)
                                        }
                                    />
                                    <span>Toggle Motivational Quote</span>
                                </ToggleContainer>
                                <ToggleContainer>
                                    <Toggle2
                                        onToggleChange={() =>
                                            setShowQuote2(!showQuote2)
                                        }
                                    />{" "}
                                    <span>Toggle Fitness quote</span>
                                </ToggleContainer>
                                {showQuote1 && <QuotesCard />}

                                {showQuote2 && <QuotesCard2 />}
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
                            <SaveButton
                                onClick={() =>
                                    dbService.saveTableData(
                                        nutritionDBData,
                                        nutriTableList,
                                        setNutritionDBData,
                                        setPieData
                                    )
                                }
                            />

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
                                    {nutriListEmpty
                                        ? dummyData.map((item) => (
                                              <NutriItem
                                                  key={item.name}
                                                  item={item}
                                                  handleDelete={() => {
                                                      return;
                                                  }}
                                              />
                                          ))
                                        : nutriTableList.map((item) => (
                                              <NutriItem
                                                  key={item.name}
                                                  item={item}
                                                  handleDelete={() => {
                                                      dbService.deleteItem(
                                                          item.name,
                                                          nutritionDBData,
                                                          nutriTableList,
                                                          setNutriTableList,
                                                          setPieData
                                                      );
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
