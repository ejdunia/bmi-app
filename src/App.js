import React, { useState, useEffect } from "react";
import chartsService from "./services/chartsService";
import dbService from "./services/dbService";
import DashboardContainer from "./components/styles/DashboardContainer";
import LandingPage from "./Pages/LandingPage";
import FormAndBmiPage from "./Pages/FormAndBmiPage";
import ChartsPage from "./Pages/ChartsPage";
import SettingsPage from "./Pages/SettingsPage";
import DataContext from "./context/DataContext";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainContainer from "./components/styles/MainContainer";
// const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;

const App = () => {
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

    // const [showQuote1, setShowQuote1] = useState(false);
    // const [showQuote2, setShowQuote2] = useState(false);

    // const [showQuotes, setShowQuotes] = useState({
    //     quote1: false,
    //     quote2: false,
    // });

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

    return (
        <>
            <MainContainer>
                <ToastContainer />
                <DashboardContainer>
                    <DataContext.Provider
                        value={{
                            formData,
                            setFormData,
                            bmiInfo,
                            setBmiInfo,
                            pieData,
                            labels,
                            nutriListEmpty,
                            nutritionDBData,
                            setNutritionDBData,
                            nutriTableList,
                            setNutriTableList,
                            setPieData,
                            setNutriListEmpty,
                            barOpened,
                            setBarOpened,
                            searchInput,
                            setSearchInput,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<LandingPage />} />

                            <Route
                                path="/form_and_bmi"
                                element={<FormAndBmiPage />}
                            />

                            <Route path="/charts" element={<ChartsPage />} />
                            <Route
                                path="/settings"
                                element={<SettingsPage />}
                            />

                            <Route path="*" element={"error page"} />
                        </Routes>
                    </DataContext.Provider>

                    <Nav />
                </DashboardContainer>
            </MainContainer>
        </>
    );
};

export default App;
