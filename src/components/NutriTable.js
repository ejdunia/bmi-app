import NutriItem from "./NutriItem";
import React from "react";
import StyledTable from "./styles/StyledTable";



const NutriTable = ({ NutriList, deleteItem }) => {
    return (
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
                {NutriList.map((item) => (
                    <NutriItem
                        key={item.name}
                        item={item}
                        handleDelete={() => deleteItem(item.name)}
                    />
                ))}
            </tbody>
        </StyledTable>
    );
};

export default NutriTable;
