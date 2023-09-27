import Logo from "./img/logo.svg";
import "./nav.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDesktop,faCalendarDays, faBook, faArrowRightFromBracket, faCog} from "@fortawesome/free-solid-svg-icons"
import { Outlet, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import UserPhoto from "./img/user.jpg";
import Pedagog from "./img/Pedagog.png";
import { useState } from "react";
import Config from "../Config.js";
import LeftArrow from "./img/LeftArrow.svg"
import { useLocation } from "react-router-dom";

function Nav(props) {
  const location = useLocation();
  const [Popup, setPopUp] = useState(false);
  const LogOut = () => {
    const cookies = new Cookies();
    cookies.remove('token');
    window.location =Config.homePageUrl;

  
};
  return (
    <>
    <nav>
        <div>
            <Link to="/"><img src={Logo} /></Link>
            <h1>ETŠ</h1>
        </div>
        <ul>
        <Link to="/"><li className={location.pathname === "/" ? "active" : ""}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.04596 10.6987C9.55878 10.6987 10.7852 9.47235 10.7852 7.95953C10.7852 6.44671 9.55878 5.22033 8.04596 5.22033C6.53314 5.22033 5.30676 6.44671 5.30676 7.95953C5.30676 9.47235 6.53314 10.6987 8.04596 10.6987ZM8.04596 11.8727C10.2071 11.8727 11.9591 10.1207 11.9591 7.95953C11.9591 5.79836 10.2071 4.04639 8.04596 4.04639C5.88479 4.04639 4.13282 5.79836 4.13282 7.95953C4.13282 10.1207 5.88479 11.8727 8.04596 11.8727ZM15.8722 5.22033H19.0028C19.6511 5.22033 20.1767 5.74593 20.1767 6.39428V9.5248C20.1767 10.1731 19.6511 10.6987 19.0028 10.6987H15.8722C15.2239 10.6987 14.6983 10.1731 14.6983 9.52479V6.39428C14.6983 5.74593 15.2239 5.22033 15.8722 5.22033ZM13.5244 6.39428C13.5244 5.09757 14.5755 4.04639 15.8722 4.04639H19.0028C20.2995 4.04639 21.3506 5.09758 21.3506 6.39428V9.5248C21.3506 10.8215 20.2995 11.8727 19.0028 11.8727H15.8722C14.5755 11.8727 13.5244 10.8215 13.5244 9.52479V6.39428ZM6.4807 14.6119H9.61122C10.2596 14.6119 10.7852 15.1375 10.7852 15.7858V18.9163C10.7852 19.5647 10.2596 20.0903 9.61122 20.0903H6.4807C5.83235 20.0903 5.30676 19.5647 5.30676 18.9163V15.7858C5.30676 15.1375 5.83235 14.6119 6.4807 14.6119ZM4.13281 15.7858C4.13281 14.4891 5.184 13.4379 6.4807 13.4379H9.61122C10.9079 13.4379 11.9591 14.4891 11.9591 15.7858V18.9163C11.9591 20.213 10.9079 21.2642 9.61122 21.2642H6.4807C5.184 21.2642 4.13281 20.213 4.13281 18.9163V15.7858ZM20.1767 17.3511C20.1767 18.8639 18.9503 20.0903 17.4375 20.0903C15.9247 20.0903 14.6983 18.8639 14.6983 17.3511C14.6983 15.8383 15.9247 14.6119 17.4375 14.6119C18.9503 14.6119 20.1767 15.8383 20.1767 17.3511ZM21.3506 17.3511C21.3506 19.5123 19.5987 21.2642 17.4375 21.2642C15.2763 21.2642 13.5244 19.5123 13.5244 17.3511C13.5244 15.1899 15.2763 13.4379 17.4375 13.4379C19.5987 13.4379 21.3506 15.1899 21.3506 17.3511Z" fill="white"/></svg> Dashboard</li></Link>
          <Link to="calendar"><li className={location.pathname === "/calendar" ? "active" : ""}><FontAwesomeIcon icon={faCalendarDays} color='' /> Calendar</li></Link>
          <Link to="courses"><li className={location.pathname === "/courses" ? "active" : location.pathname === "/course" ? "active" : ""}><FontAwesomeIcon icon={faBook} /> Course</li></Link>
          <Link to="setting"><li className={location.pathname === "/setting" ? "active" : ""}><FontAwesomeIcon icon={faCog} /> Setting</li></Link>

        </ul>
        <ul id="LogOut">
         {/* <Link to="profile">
          <li  id="UserLable" className={location.pathname === "/profile" ? "active" : ""}>
          <img src={UserPhoto} alt="" />
          <div className="text">
            <h4>{props.data}</h4>
            <p>{props.class}</p>
          </div>
           
          </li>
          </Link>
          <li onClick={()=> setPopUp(true)}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out</li>
          
          */} 
          <div className="Pedagog">
            <img src={Pedagog}/>
              <h3>Pedagog</h3>
              <p>Nas pedagog je uvijek tu da te saslusa o svim problemima</p>
              <button>Pozovi</button>
          </div>
        </ul>
    </nav>

    <div className='MobileNav'>
       <ul>
       <Link to="/"><li className={location.pathname === "/" ? "active" : ""}><FontAwesomeIcon icon={faDesktop} /></li></Link>
          <Link to="courses"><li className={location.pathname === "/courses" ? "active" : location.pathname === "/course" ? "active" : ""}><FontAwesomeIcon icon={faBook} /></li></Link>

          <Link to="calendar"><li className={location.pathname === "/calendar" ? "active" : ""}><FontAwesomeIcon icon={faCalendarDays} color='' /></li></Link>

    
        </ul>
    </div>
    <Outlet />
    <div className="MobHeader" >
    
    {location.pathname === "/" ? <Link to="/"><img src={Logo} /></Link> : location.pathname === "/course" ? <Link to="/"><img className="courseArrow"src={LeftArrow} /></Link>:location.pathname === "/profile" ? <Link to="/"><img className="courseArrow"src={LeftArrow} /></Link>:<Link to="/"><img className="courseArrow"src={LeftArrow} /></Link>}
    <h3>{location.pathname === "/" ? "LMS" : location.pathname === "/course" ? "Course": location.pathname === "/profile" ? "Profile":"Strana u izradi"}</h3>
    {location.pathname != "/profile" ?<Link to="profile"><img src={UserPhoto} className="UserPhoto"/></Link> : location.pathname === "/profile" ? <FontAwesomeIcon icon={faCog}/>: ""}
            
    </div>
    <div className="PopUp" id={Popup === true ? "opened" : ""}>
        <div className="LogoutAlert">
          <p>Do you want to log out?</p>
          <div className="Buttons">
            <button id="yes" onClick={() => LogOut()}>Yes</button>
            <button id="no" onClick={() => setPopUp(false)}>No</button>
          </div>
        </div>
    </div>
    </>
  );
}

export default  Nav;
