import styled from "styled-components";

const ChartContainer = styled.div`
    & :first-child {
        position: absolute;
    }
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 10px;
    border: 1px solid grey;
    background: #f3f4f6;
    border-radius: 5px;
    height: 200px;
    width: 90%;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
        drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

export default ChartContainer;
