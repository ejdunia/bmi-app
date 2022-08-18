import NutriItem from "./NutriItem";
import React from "react";
import styled from "styled-components";
import StyledTable from "./styles/StyledTable";

const deleteItem = (itemname, nutriList) => {
    // const url = `http://localhost:3001/names/${name}`;
    console.log(nutriList);
    console.log(itemname);
    
    //       window.confirm(` id ${name} will be deleted`)
    //           ? axios.delete(url).then((response) => {
    //                 console.log(`${name} has been deleted`);
    //             })
    //           : alert("aborted");
};

const NutriTable = ({ NutriList }) => {
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
