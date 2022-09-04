import styled from "styled-components";

const NavBar = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    width: auto;
    height: 90%;
    /* border: 2px solid green; */

    img {
        width: 30px;
    }

    @media (max-width: 600px) {
        /* border: 2px solid red; */
        flex-direction: row;
        width: 90%;
        height: 30px;
    }
`;

export default NavBar;
