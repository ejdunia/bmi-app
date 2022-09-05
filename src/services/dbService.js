import axios from "axios";
import { toast } from "react-toastify";
import chartsService from "./chartsService";

const baseURL = `http://localhost:3001/nutrition_data`;

const getDBData = async () => {
    const res = await axios.get(baseURL).then((res) => res.data);
    return res;
};

const toDisplay = (res) => {
    res = res?.find((nutri) => nutri.date === new Date().toLocaleDateString());
    if (typeof res === "undefined") {
        console.log("res is undefined");
        return [];
    } else {
        return res.nutriList;
    }
};

const deleteItem = (
    itemname,
    nutritionDBData,
    nutriTableList,
    setNutriTableList,
    setPieData
) => {
    const date = new Date().toLocaleDateString();
    const toDelete = nutritionDBData.find((nutri) => nutri.date === date);
    const id = toDelete?.id;
    const url = `${baseURL}/${id}`;
    let updatedNutriList = nutriTableList.filter(
        (item) => item.name !== itemname
    );
    setNutriTableList(updatedNutriList);
    const sentData = {
        date,
        nutriList: updatedNutriList,
    };
    axios
        .put(url, sentData)
        .then((response) => {
            console.log(response.data?.nutriList);
            setPieData(response.data?.nutriList);
        })
        .catch((error) => console.log(error));
    toast("deleted");
    console.log(`${itemname} has been deleted`);
};

const updateTableData = (date, nutritionDBData, nutriTableList, setPieData) => {
    const toUpdate = nutritionDBData.find((nutri) => nutri.date === date);
    const id = toUpdate?.id;
    const url = `${baseURL}/${id}`;

    const sentData = {
        date,
        nutriList: nutriTableList,
    };

    axios
        .put(url, sentData)
        .then((response) => {
            console.log("update function ran");
            console.log(response.data.nutriList);

            setPieData(chartsService.getPieChartData(nutriTableList));
            console.log("finished updating the table");
        })
        .catch((error) => console.log(error));
};
const saveTableData = (
    nutritionDBData,
    nutriTableList,
    setNutritionDBData,
    setPieData
) => {
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
            date: new Date().toLocaleDateString(),
            nutriList: nutriTableList,
        };
        axios.post(baseURL, entry).then((response) => {
            setPieData(nutriTableList);
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
        isEqual
            ? console.log("no changes made")
            : updateTableData(
                  date,
                  nutritionDBData,
                  nutriTableList,
                  setPieData
              );
        console.log(compareIfEqual(inNutriDB?.nutriList, nutriTableList));
    }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getDBData,
    deleteItem,
    toDisplay,
    updateTableData,
    saveTableData,
};
