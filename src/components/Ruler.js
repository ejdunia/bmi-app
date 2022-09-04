import React from "react";
import styled from "styled-components";
const RulerContainer = styled.ul`
    margin: 2px;
    padding: 2px;
    list-style: none;
    /* color: #374151; */
    margin: 0;
    white-space: nowrap;
    margin: 10px;
    & li {

        margin: 0;
        padding: 0;
        list-style: none;
        display: inline-block;
        padding-left: 2cm;
        width: 2em;
        margin: 0.64em -1em -0.64em;
        text-align: center;
        position: relative;
    }

    & li:before {
        content: "";
        position: absolute;
        border-left: 2px solid #374151;
        height: 0.64em;
        top: -0.64em;
        right: 1em;
    }
`;

const Ruler = ({ value }) => {
    return (
        <div>
            <RulerContainer>
                <li>.</li>
                <li>{value}</li>
                <li>.</li>
            </RulerContainer>
        </div>
    );
};

export default Ruler;
