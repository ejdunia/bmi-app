import styled from "styled-components";

const DashboardContainer = styled.div`
    border: 1px solid red;
    border-radius: 20px;
    margin: 20px;
    width: 70vw;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media (max-width: 600px) {
        border: 2px solid yellow;
        flex-direction: column;
        width: 100vw;
        height: 95%;
    }

    background: linear-gradient(
        90deg,
        hsla(186, 33%, 94%, 1) 0%,
        hsla(216, 41%, 79%, 1) 100%
    );

    background: -moz-linear-gradient(
        90deg,
        hsla(186, 33%, 94%, 1) 0%,
        hsla(216, 41%, 79%, 1) 100%
    );

    background: -webkit-linear-gradient(
        90deg,
        hsla(186, 33%, 94%, 1) 0%,
        hsla(216, 41%, 79%, 1) 100%
    );
`;

export default DashboardContainer;
