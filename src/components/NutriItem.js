import React from "react";
import styled from "styled-components";
import cancelImage from "../assets/close.png";
import StyledButton from "./styles/StyledButton.styled";

const ButtonIcon = styled(StyledButton)`
    width: 25px;
    padding: 10px;
    min-height: 5px;
    border-radius: 20px;
    margin: 5px;
`;

const NutriItem = ({ item, handleDelete }) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.fat_total_g}</td>
            <td>{item.calories}</td>
            <td>{item.protein_g}</td>
            <td>
                <ButtonIcon onClick={handleDelete}>
                    <img src={cancelImage} alt="cancel" />
                </ButtonIcon>
            </td>
        </tr>
    );
};

export default NutriItem;
