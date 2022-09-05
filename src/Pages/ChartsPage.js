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
import dbService from "../services/dbService";
import StyledTable from "../components/styles/StyledTable";
import SearchBar from "../components/SearchBar";
import SaveButton from "../components/SaveButton";
import NutriItem from "../components/NutriItem";
import FoodTrackerBox from "../components/styles/FoodTrackerBox";
import { toast } from "react-toastify";
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

const ChartsPage = () => {
    const {
        nutriListEmpty,
        nutritionDBData,
        setNutritionDBData,
        nutriTableList,
        setNutriTableList,
        setPieData,
        setSearchInput,
        barOpened,
        setBarOpened,
        searchInput,
        setNutriListEmpty,
    } = useContext(DataContext);
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
        </Container>
    );
};

export default ChartsPage;
