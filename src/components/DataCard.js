import React from "react";
import styled from "styled-components";
import Ruler from "./Ruler";

const DataCardHolder = styled.div`
    display: flex;
    max-width: 250px;
    height: 90px;
    color: #374151;
    box-sizing: border-box;
    align-items: center;
    padding: 10px;
    /* margin: 10px; */
    font: 15px Ubuntu, Arial, sans-serif;
    font-weight: bold;
    border-radius: 10px;
    background: ${(props) => (props.primary ? "#f8debd" : "#D0FBFF")};
`;

const DataCard = ({ name, value, primary }) => {
    return (
        <DataCardHolder primary={primary}>
            <div>{name}</div>
            <div>
                <Ruler value={value} />
            </div>
        </DataCardHolder>
    );
};

export default DataCard;
