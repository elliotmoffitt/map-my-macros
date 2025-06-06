import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import Logo from '../../../public/images/logo.svg';

function Navigation():JSX.Element {
  return (
        <div id='navigation'>
          <NavLink to="/"><img src={Logo} id='navigation-logo'/></NavLink>
          <ProfileButton />
        </div>
  );
}

export default Navigation;
