import React from "react";
import styled from "styled-components";
import Ruler from "./Ruler";

const DataCardHolder = styled.div`
    display: flex;
    width: 90%;
    height: 150px;
    color: #374151;
    min-height: fit-content;
    box-sizing: border-box;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
    margin: 10px;
    font-weight: 500;
    border-radius: 10px;
    flex-grow: 1;
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
