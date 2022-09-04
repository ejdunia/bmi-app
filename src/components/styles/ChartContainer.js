import styled from "styled-components";

const ChartContainer = styled.div`
    & :first-child {
        position: absolute;
    }
    position: relative;
    border: 1px solid grey;
    background: #f3f4f6;
    border-radius: 5px;
    height: 40%;
    width: 90%;
    flex-grow: 1;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
        drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

export default ChartContainer;
