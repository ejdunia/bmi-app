const getPieChartData = (dataArray) => {
    const val = dataArray.reduce(
        function (previousValue, currentValue) {
            return {
                calories: previousValue.calories + currentValue.calories + 0,
                fat_total_g:
                    previousValue.fat_total_g + currentValue.fat_total_g + 0,
                protein_g: previousValue.protein_g + currentValue.protein_g + 0,
            };
        },
        { calories: 0, fat_total_g: 0, protein_g: 0 }
    );
    return Object.values(val);
};

const getLineChartLabels = (response) => {
    return response.map((response) => response.date).slice(-7);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getPieChartData, getLineChartLabels };
