import React, { useState, useEffect } from "react";
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
// import { Link } from "react-router-dom";
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
    const [showQuote1, setShowQuote1] = useState(false);
    const [showQuote2, setShowQuote2] = useState(false);
    const todaysDate = new Date().toLocaleDateString();
    const baseURL = `http://localhost:3001/nutrition_data`;

    // todo put the form into one single objeect

    const [personInfo, setPersonInfo] = useState({
        sex: "male",
        date: "date",
        weight: 90,
        height: 190,
        age: 90,
        BMI: 24.9,
        healthStatus: "Normal Body Weight",
    });
    const [nutriTableList, setNutriTableList] = useState([]);
    const [nutriListEmpty, setNutriListEmpty] = useState(false);
    const [nutritionDBData, setNutritionDBData] = useState([]);
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [date, setDate] = useState("2000-01-01");
    const [sex, setSex] = useState("");

    //  see commment above

    const [barOpened, setBarOpened] = useState(false);
    const [pieData, setPieData] = useState([]);

    const [searchInput, setSearchInput] = useState("");

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const deleteItem = (itemname) => {
        const date = new Date().toLocaleDateString();
        console.log(nutritionDBData);
        const toDelete = nutritionDBData.find((nutri) => nutri.date === date);
        const id = toDelete?.id;
        const url = `http://localhost:3001/nutrition_data/${id}`;
        let updatedNutriList = nutriTableList.filter(
            (item) => item.name !== itemname
        );

        setNutriTableList(updatedNutriList);
        const sentData = {
            date: todaysDate,
            nutriList: updatedNutriList,
        };
        axios
            .put(url, sentData)
            .then((response) => {
                setPieChartData(response.data?.nutriList);
            })
            .catch((error) => console.log(error));
        toast("deleted");
        console.log(`${itemname} has been deleted`);
    };

    const updateTableData = (date) => {
        const toUpdate = nutritionDBData.find((nutri) => nutri.date === date);
        const id = toUpdate?.id;
        const url = `http://localhost:3001/nutrition_data/${id}`;

        const sentData = {
            date,
            nutriList: nutriTableList,
        };

        // console.log(nutriTableList);
        axios
            .put(url, sentData)
            .then((response) => {
                console.log("update function ran");
                setPieChartData(nutriTableList);
            })
            .catch((error) => console.log(error));
    };

    const saveTableData = () => {
        // compare if the arrays from the DB and the nutrilist are the samae
        const compareIfEqual = (a, b) => {
            return JSON.stringify(a) === JSON.stringify(b);
        };

        const date = new Date().toLocaleDateString();
        const inNutriDB = nutritionDBData.find((nutri) => nutri.date === date);

        let isEqual = compareIfEqual(inNutriDB?.nutriList, nutriTableList);

        if (nutriTableList.length < 1) {
            console.log("list empty");
            return;
        } else if (inNutriDB?.date !== date) {
            console.log("posting to db");

            const entry = {
                date: todaysDate,
                nutriList: nutriTableList,
            };
            axios.post(baseURL, entry).then((response) => {
                setPieChartData(nutriTableList);
                // let newDBData = nutritionDBData.concat(entry);
                // console.log(newDBData);
                setNutritionDBData((nutritionDBData) => [
                    ...nutritionDBData,
                    entry,
                ]);
                // console.log(nutritionDBData);
                toast("Saved");
            });
        } else {
            isEqual ? console.log("no changes made") : updateTableData(date);
            console.log(compareIfEqual(inNutriDB?.nutriList, nutriTableList));
        }
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
    const healthStatus = (bmi) => {
        if (bmi < 18.5) {
            return `You're Underweight`;
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return `Normal Body Weight`;
        } else {
            return `You're Overweight`;
        }
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
            healthStatus: healthStatus(calculateBMI(weight, height)),
        };
        setPersonInfo(details);
        setWeight("");
        setHeight("");
        setDate("2000-01-01");
        console.log(details);
    };

    useEffect(() => {
        // IIFE to fetch the data
        (async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3001/nutrition_data`
                );
                setNutritionDBData(res.data);
                const toDisplay = res.data?.find(
                    (nutri) => nutri.date === todaysDate
                );
                setNutriTableList(toDisplay.nutriList);
                setPieChartData(toDisplay.nutriList);
            } catch (err) {
                console.log(err);
            }

            // console.log(0);
        })();
    }, [todaysDate]);

    const setPieChartData = (pieDataArray) => {
        const val = pieDataArray.reduce(
            function (previousValue, currentValue) {
                return {
                    calories:
                        previousValue.calories + currentValue.calories + 0,
                    fat_total_g:
                        previousValue.fat_total_g +
                        currentValue.fat_total_g +
                        0,
                    protein_g:
                        previousValue.protein_g + currentValue.protein_g + 0,
                };
            },
            { calories: 0, fat_total_g: 0, protein_g: 0 }
        );
        setPieData(Object.values(val));
    };

    const pieChartData = {
        labels: ["Calories", "Fat", "Protien"],
        datasets: [
            {
                label: "# of Votes",

                data: pieData,
                // data: setTimeout(() => [12, 34, 54], 1000),
                // data: [12, 34, 56],
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
    const getLineCHartLabels = () => {
        return [
            "12/08/2022",
            "15/08/2022",
            "16/08/2022",
            "17/08/2022",
            "20/08/2022",
            "22/08/2022",
            "23/08/2022",
        ];
    };
    // here i can map the last 7 days chart for calories and stuff

    const labels = getLineCHartLabels();

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
                    <FlexColumn>
                        <Container>
                            {true && (
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
                            <SaveButton onClick={() => saveTableData()} />

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
                                                      deleteItem(
                                                          item.name,
                                                          date
                                                      );
                                                  }}
                                              />
                                          ))}
                                </tbody>
                            </StyledTable>
                        </FoodTrackerBox>
                    </FlexColumn>
                    <Nav />
                </DashboardContainer>
            </MainContainer>
        </>
    );
};

export default App;
