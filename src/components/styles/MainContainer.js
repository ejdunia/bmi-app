import styled from "styled-components";

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: hsla(205, 46%, 10%, 1);

    background: linear-gradient(
        90deg,
        hsla(205, 46%, 10%, 1) 0%,
        hsla(191, 28%, 23%, 1) 50%,
        hsla(207, 41%, 27%, 1) 100%
    );

    background: -moz-linear-gradient(
        90deg,
        hsla(205, 46%, 10%, 1) 0%,
        hsla(191, 28%, 23%, 1) 50%,
        hsla(207, 41%, 27%, 1) 100%
    );

    background: -webkit-linear-gradient(
        90deg,
        hsla(205, 46%, 10%, 1) 0%,
        hsla(191, 28%, 23%, 1) 50%,
        hsla(207, 41%, 27%, 1) 100%
    );

    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0E1C26", endColorstr="#2A454B", GradientType=1 );
`;

export default MainContainer;
