import React from "react";
import addImage from "../assets/add.png";
import cancelImage from "../assets/close.png";
const NutriItem = ({ item, addTo, handleDelete }) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.fat_total_g}</td>
            <td>{item.calories}</td>
            <td>{item.protein_g}</td>
            <td>
                <button onClick={addTo}>
                    {<img src={addImage} alt="add " />}{" "}
                </button>
            </td>
            <td>
                <button onClick={handleDelete}>
                    <img src={cancelImage} alt="cancel" />
                </button>
            </td>
        </tr>
    );
};

export default NutriItem;
