import styled from "styled-components";

const StyledTable = styled.table`
    top: 40px;
    border-radius: 20px;
    width: 90%;
    border-collapse: collapse;
    thead {
        background: #4a4949;
        color: wheat;
        position: sticky;
        padding: 20px;
        border-radius: 20px;
    }
    th {
        text-align: left;
        font-weight: 500;
        font-size: 12px;
        text-transform: uppercase;
        border-radius: 20px;
    }
    td {
        text-align: center;
        vertical-align: middle;
        font-weight: 300;
        font-size: 15px;
        border-bottom: solid 1px rgba(255, 255, 255, 0.1);
    }

    tbody tr:nth-child(odd) {
        background: #f8debd;
    }
    tbody tr:nth-child(even) {
        background: #1e293b;
        color: wheat;
    }
    tbody {
    }
    img {
        width: 10px;
    }
`;

export default StyledTable;
