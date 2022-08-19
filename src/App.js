import React, { useState, useEffect } from "react";
import BmiInfo from "./components/BmiInfo";
import DataCard from "./components/DataCard";
import PersonForm from "./components/PersonForm";
import { Chart, Doughnut } from "react-chartjs-2";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainContainer from "./components/styles/MainContainer";
import FoodTrackerBox from "./components/styles/FoodTrackerBox";
import StyledTable from "./components/styles/StyledTable";
import SearchBar from "./components/SearchBar";
import axios from "axios";
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
    const todaysDate = new Date().toLocaleDateString();
    const baseURL = `http://localhost:3001/nutrition_data`;
    const [personInfo, setPersonInfo] = useState({});
    const [nutriTableList, setNutriTableList] = useState([]);
    const [nutriListEmpty, setNutriListEmpty] = useState(false);
    const [nutritionDBData, setNutritionDBData] = useState([]);
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [date, setDate] = useState("2000-01-01");
    const [sex, setSex] = useState("");
    const [barOpened, setBarOpened] = useState(false);
    const [pieData, setPieData] = useState([]);

    const [searchInput, setSearchInput] = useState("");

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const updateTableData = (date) => {
        const toUpdate = nutritionDBData.find((nutri) => nutri.date === date);
        const id = toUpdate?.id;
        const url = `http://localhost:3001/nutrition_data/${id}`;
        let updatedNutriList = [...toUpdate?.nutriList, ...nutriTableList];
        updatedNutriList = [
            ...new Map(
                updatedNutriList.map((item) => [item["name"], item])
            ).values(),
        ];
        console.log(updatedNutriList);

        const sentData = {
            date,
            nutriList: updatedNutriList,
        };
        console.log(sentData);
        axios
            .put(url, sentData)
            .then((response) => {
                // console.log(response);
            })
            .catch((error) => console.log(error));
    };

    const deleteItem = (itemname) => {
        const date = new Date().toLocaleDateString();
        const toUpdate = nutritionDBData.find((nutri) => nutri.date === date);
        const id = toUpdate?.id;
        const url = `http://localhost:3001/nutrition_data/${id}`;
        // console.log(id);
        setNutriTableList(
            nutriTableList.filter((item) => item.name !== itemname)
        );
        // let updatedNutriList = [...toUpdate?.nutriList, ...nutriTableList];
        let updatedNutriList = nutriTableList.filter(
            (item) => item.name !== itemname
        );

        updatedNutriList = [
            ...new Map(
                updatedNutriList.map((item) => [item["name"], item])
            ).values(),
        ];
        console.log(updatedNutriList);

        const sentData = {
            date,
            nutriList: updatedNutriList,
        };
        // console.log(sentData);
        axios
            .put(url, sentData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
        toast("deleted");
        console.log(`${itemname} has been deleted`);
        getPieChartData();
    };

    const saveTableData = () => {
        let date = new Date().toLocaleDateString();
        let alreadyIncluded = nutritionDBData.some(
            (nutri) => nutri.date === date
        );
        if (alreadyIncluded) {
            updateTableData(date);
            return;
        } else if (nutriTableList.length === 0) {
            return;
        } else {
            // whatever is saved in the table gets pushed to the db if it isnt empty
            const toastSaved = () =>
                toast("Saved", {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            toastSaved();
            const entry = {
                date: date,
                nutriList: nutriTableList,
            };
            console.log(entry);
            axios.post(baseURL, entry);
        }
        getPieChartData();
    };

    const onSearchFormSubmit = (e) => {
        e.preventDefault();
        setSearchInput("");
        setBarOpened(false);
        // notify1();object
        // After form submit, do what you want with the input value
        // console.log(`search was submited with input: ${searchInput}`);
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
                // console.log(response.data);
                if (response.data?.length === 0) {
                    toast("Nothing found, please try again");
                } else {
                    let exists = nutriTableList.some(
                        (el) => el.name === response.data[0]?.name
                    );

                    if (!exists) {
                        toast.update(id, {
                            render: "Done",
                            type: "success",
                            isLoading: false,
                            autoClose: 1000,
                        });
                        setNutriTableList(nutriTableList.concat(response.data));
                    } else {
                        toast.update(id, {
                            render: `${response?.data[0]?.name} already exists`,
                            type: "info",
                            isLoading: false,
                            autoClose: 1000,
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
        let date = new Date().toLocaleDateString();

        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3001/nutrition_data`
                );
                setNutritionDBData(res.data);
                // console.log(res.data);
                const toDisplay = res.data?.find(
                    (nutri) => nutri.date === date
                );

                setNutriTableList(toDisplay.nutriList);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        getPieChartData();
    }, []);

    const getPieChartData = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/nutrition_data`);
            const toDisplay = res.data?.find(
                (nutri) => nutri.date === todaysDate
            );

            const val = toDisplay.nutriList.reduce(function (
                previousValue,
                currentValue
            ) {
                return {
                    calories: previousValue.calories + currentValue.calories,
                    fat_total_g:
                        previousValue.fat_total_g + currentValue.fat_total_g,
                    protein_g: previousValue.protein_g + currentValue.protein_g,
                };
            });

            console.log(val);
            setPieData(Object.values(val));
        } catch (err) {
            console.log(err);
        }
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
    const getLineCHartLabels = () => {
        return ["sd", "February", "March", "April", "May", "June", "July"];
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
                            {pieData?.length > 1 && (
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
                </DashboardContainer>
            </MainContainer>
        </>
    );
};

export default App;
