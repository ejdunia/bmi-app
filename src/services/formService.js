import axios from "axios";
import { toast } from "react-toastify";

const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;

const calculateBMI = (weight, height) => {
    const BMI = Math.round((weight / (height / 100) ** 2) * 10) / 10;
    return BMI;
};
// const handleChange = (event, setFormData) => {
//     console.log(event);
//     const { name, value, type, checked } = event.target;
//     setFormData((prevFormData) => {
//         return {
//             ...prevFormData,
//             [name]: type === "checkbox" ? checked : value,
//         };
//     });
// };
// const handleChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     // console.log(event.target);
//       setFormData((prevFormData) => {
//           return {
//               ...prevFormData,
//               [name]: type === "checkbox" ? checked : value,
//           };
//       });
//       setFormData((prevFormData) => {
//           return {
//               ...prevFormData,
//               [name]: type === "checkbox" ? checked : value,
//           };
//       });
// };

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

// const handleSearchInput = (e) => {
//     setSearchInput(e.target.value);
// };

// const onSearchFormSubmit = (e) => {
//     e.preventDefault();
//     setSearchInput("");
//     setBarOpened(false);
//     // After form submit, do what you want with the input value
//     const options = {
//         method: "GET",
//         url: "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition",
//         params: { query: searchInput },
//         headers: {
//             "X-RapidAPI-Key": rapidApiKey,
//             "X-RapidAPI-Host": "nutrition-by-api-ninjas.p.rapidapi.com",
//         },
//     };
//     const id = toast.loading("Loading...");
//     axios
//         .request(options)
//         .then((response) => {
//             if (response.data?.length === 0) {
//                 toast("Nothing found, please try again");
//                 toast.update(id, {
//                     render: "",
//                     type: "info",
//                     isLoading: false,
//                     autoClose: 100,
//                 });
//             } else {
//                 let exists = nutriTableList.find(
//                     (el) => el.name === response.data[0]?.name
//                 );

//                 if (!exists) {
//                     toast.update(id, {
//                         render: "Done",
//                         type: "success",
//                         isLoading: false,
//                         autoClose: 500,
//                     });
//                     setNutriTableList((nutriTableList) =>
//                         nutriTableList.concat(response.data)
//                     );
//                     // console.log(response.data);
//                 } else {
//                     toast.update(id, {
//                         render: `${response?.data[0]?.name} already exists`,
//                         type: "info",
//                         isLoading: false,
//                         autoClose: 500,
//                     });
//                 }
//             }

//             setNutriListEmpty(false);
//         })
//         .catch((error) => {
//             toast(error);
//             console.error(error);
//         });
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default { calculateBMI, healthStatus, calculateAge };
