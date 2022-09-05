import styled from "styled-components";

const NavBar = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    width: auto;
    height: 90%;
    /* border: 2px solid green; */
    margin: 20px;
    img {
        width: 40px;
    }

    @media (max-width: 600px) {
        flex-direction: row;
        width: 90%;
        height: 40px;
    }
`;

export default NavBar;
