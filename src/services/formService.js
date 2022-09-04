const calculateBMI = (weight, height) => {
    const BMI = Math.round((weight / (height / 100) ** 2) * 10) / 10;
    return BMI;
};
const handleChange = (event, setFormData) => {
    console.log(event);
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        };
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { calculateBMI, handleChange };
