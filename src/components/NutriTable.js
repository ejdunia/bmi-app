import NutriItem from "./NutriItem";

import React from "react";
import styled from "styled-components";
const StyledTable = styled.table`
    position: absolute;
    top: 40px;
    thead {
        background: #4a4949;
        color: wheat;
        position: sticky;
    }
    th {
        /* padding: 20px 15px; */
        text-align: left;
        font-weight: 500;
        font-size: 12px;
        text-transform: uppercase;
    }
    td {
        padding: 2px;
        text-align: center;
        vertical-align: middle;
        font-weight: 300;
        font-size: 15px;
        border-bottom: solid 1px rgba(255, 255, 255, 0.1);
    }
    width: 85%;
    border-collapse: collapse;
    tbody tr:nth-child(odd) {
        background: #eee;
    }
    img {
        width: 10px;
    }
    button {
        border-radius: 10px;
        width: auto;
        /* background: #000; */
    }
    /* overflow: scroll; */
`;

const NutriTable = ({ NutriList, addTo, handleDelete }) => {
    NutriList = [
        {
            id: 1,
            name: "food1",
            calories: 1312.3,
            serving_size_g: 453.592,
            fat_total_g: 82.9,
            fat_saturated_g: 33.2,
            protein_g: 132,
            sodium_mg: 217,
            potassium_mg: 781,
            cholesterol_mg: 487,
            carbohydrates_total_g: 0,
            fiber_g: 0,
            sugar_g: 0,
        },
        {
            id: 2,
            name: "food2",
            calories: 317.7,
            serving_size_g: 100,
            fat_total_g: 14.8,
            fat_saturated_g: 2.3,
            protein_g: 3.4,
            sodium_mg: 212,
            potassium_mg: 124,
            cholesterol_mg: 0,
            carbohydrates_total_g: 41.1,
            fiber_g: 3.8,
            sugar_g: 0.3,
        },
        {
            id: 312,
            name: "fries",
            calories: 317.7,
            serving_size_g: 100,
            fat_total_g: 14.8,
            fat_saturated_g: 2.3,
            protein_g: 3.4,
            sodium_mg: 212,
            potassium_mg: 124,
            cholesterol_mg: 0,
            carbohydrates_total_g: 41.1,
            fiber_g: 3.8,
            sugar_g: 0.3,
        },
        {
            id: 3121,
            name: "fries",
            calories: 317.7,
            serving_size_g: 100,
            fat_total_g: 14.8,
            fat_saturated_g: 2.3,
            protein_g: 3.4,
            sodium_mg: 212,
            potassium_mg: 124,
            cholesterol_mg: 0,
            carbohydrates_total_g: 41.1,
            fiber_g: 3.8,
            sugar_g: 0.3,
        },
        {
            id: 563,
            name: "fries",
            calories: 317.7,
            serving_size_g: 100,
            fat_total_g: 14.8,
            fat_saturated_g: 2.3,
            protein_g: 3.4,
            sodium_mg: 212,
            potassium_mg: 124,
            cholesterol_mg: 0,
            carbohydrates_total_g: 41.1,
            fiber_g: 3.8,
            sugar_g: 0.3,
        },
        {
            id: 356,
            name: "fries",
            calories: 317.7,
            serving_size_g: 100,
            fat_total_g: 14.8,
            fat_saturated_g: 2.3,
            protein_g: 3.4,
            sodium_mg: 212,
            potassium_mg: 124,
            cholesterol_mg: 0,
            carbohydrates_total_g: 41.1,
            fiber_g: 3.8,
            sugar_g: 0.3,
        },
        {
            id: 3765,
            name: "fries",
            calories: 317.7,
            serving_size_g: 100,
            fat_total_g: 14.8,
            fat_saturated_g: 2.3,
            protein_g: 3.4,
            sodium_mg: 212,
            potassium_mg: 124,
            cholesterol_mg: 0,
            carbohydrates_total_g: 41.1,
            fiber_g: 3.8,
            sugar_g: 0.3,
        },
        {
            id: 3456,
            name: "fries",
            calories: 317.7,
            serving_size_g: 100,
            fat_total_g: 14.8,
            fat_saturated_g: 2.3,
            protein_g: 3.4,
            sodium_mg: 212,
            potassium_mg: 124,
            cholesterol_mg: 0,
            carbohydrates_total_g: 41.1,
            fiber_g: 3.8,
            sugar_g: 0.3,
        },
    ];
    return (
        <StyledTable>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Fat(g)</td>
                    <td>Carbs(g)</td>
                    <td>Protien(g)</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>

            <tbody>
                {NutriList.slice(2, 5).map((item) => (
                    <NutriItem
                        key={item.id}
                        item={item}
                        addTo={addTo}
                        handleDelete={handleDelete}
                    />
                ))}
            </tbody>
        </StyledTable>
    );
};

export default NutriTable;
