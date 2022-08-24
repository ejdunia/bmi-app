import styled from "styled-components";

const DashboardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background: hsla(186, 33%, 94%, 1);

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
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#EBF4F5", endColorstr="#B5C6E0", GradientType=1 );
    border-radius: 20px;
    margin: 20px;
    min-width: 300px;
`;

export default DashboardContainer;
