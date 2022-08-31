import NavBar from "./styles/NavBar";
import accountCircle from "../assets/account_circle.png";
import info from "../assets/info.png";
import monitoring from "../assets/monitoring.png";
import settingsImage from "../assets/settings.png";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <NavBar>
            <Link to="/">
                <img src={accountCircle} alt="account" />
            </Link>
            <Link to="">
                <img src={settingsImage} alt="settings " />
            </Link>
            <Link to=''>
                <img src={info} alt="info" />
            </Link>
            <Link to=''>
                <img src={monitoring} alt="monitoring" />
            </Link>
            <Link to=''>
                <img src={accountCircle} alt="account" />
            </Link>
        </NavBar>
    );
};

export default Nav;
