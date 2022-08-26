import NavBar from "./styles/NavBar";
import accountCircle from "../assets/account_circle.png";
import info from "../assets/info.png";
import monitoring from "../assets/monitoring.png";
import settingsImage from "../assets/settings.png";

const Nav = () => {
    return (
        <NavBar>
            <img src={accountCircle} alt="account" />
            <img src={settingsImage} alt="settings " />
            <img src={info} alt="info" />
            <img src={monitoring} alt="monitoring" />
            {/* <img src={accountCircle} alt="account" /> */}
        </NavBar>
    );
};

export default Nav;
