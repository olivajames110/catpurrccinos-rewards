import * as React from "react";

import { isMobile } from "react-device-detect";
import { NavLink } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";

import Modal from "../UIElements/Modal/Modal";
import NavLinks from "./NavLinks/NavLinks";
import { useSelector, useDispatch } from "react-redux";
import { gloabVars } from "../../shared/gloablVar";
import SideDrawer from "../UIElements/SideDrawer/SideDrawer";
import "./Header.css";
import TotalUserPoints from "../UIElements/TotalUserPoints/TotalUserPoints";
import { logout } from "../../actions/loginActions";
import { clearUser } from "../../actions/userActions";

let countdownInterval;
let timeout;
const Header = (props) => {
  const isLoggedIn = useSelector((state) => state.isLogged);
  const [timeoutCountdown, setTimeoutCountdown] = React.useState(0);
  const [timeoutWarningActive, setTimeoutWarningActive] = React.useState(true);

  const dispatch = useDispatch();
  const backButtonHandler = () => {
    props.setBackButtonIsActive(false);
  };

  const checkOutHandler = () => {
    clearCountdown();
    // clearSessionInterval();
    // clearSessionTimeout();
    dispatch(logout());
    dispatch(clearUser());
  };

  const extendTimeoutHandler = () => {
    clearCountdown();
    setTimeoutWarningActive(false);
    startCountdown();
  };

  const clearCountdown = () => {
    clearTimeout(timeout);
    clearInterval(countdownInterval);
  };
  // const clearSessionTimeout = () => {
  //   clearTimeout(timeout);
  // };

  // const clearSessionInterval = () => {
  //   clearInterval(countdownInterval);
  // };

  const startCountdown = () => {
    const delay = 1000 * 1;
    if (isLoggedIn) {
      timeout = setTimeout(() => {
        let countDown = gloabVars.timeoutTime;
        setTimeoutCountdown(countDown);
        countdownInterval = setInterval(() => {
          console.log("interval");
          if (countDown === gloabVars.timeoutWarningTime) {
            setTimeoutWarningActive(true);
          }
          if (countDown > 0) {
            setTimeoutCountdown(--countDown);
          } else {
            console.log("CHECKING OUT FUNCTION");
            checkOutHandler();
          }
        }, 1000);
      }, delay);
    }
  };

  const logoutWarning = (
    <div className={`logout-warning ${timeoutWarningActive && "visible"}`}>
      <span> Your session will expire in {timeoutCountdown} seconds!</span>
      <button className="extend-session-button" onClick={extendTimeoutHandler}>
        Extend My Session
      </button>
    </div>
  );

  const returnHomeButton = (
    <NavLink onClick={backButtonHandler} to="/">
      <span className="return-icon-wrapper">{leftArrow}</span>
      <span>Go Back</span>
    </NavLink>
  );

  const logoutButton = (
    <button onClick={checkOutHandler} className="small">
      <span className="icon-wrapper">{leftArrow}</span>
      <span>Logout</span>
    </button>
  );

  const loggedInButton = (
    <>
      <div className="return-button-wrapper">
        {props.backButtonIsActive ? returnHomeButton : logoutButton}
      </div>
    </>
  );

  const boardLogo =
    "https://digitalmarketing.blob.core.windows.net/10030/images/items/image719887.png";

  React.useEffect(() => {
    if (isLoggedIn) {
      startCountdown();
    } else {
      clearCountdown();
      setTimeoutWarningActive(false);
    }
  }, [isLoggedIn]);

  return (
    <header>
      <div className="header-inner-wrapper">
        <NavLink id="logo" className={isLoggedIn && "logged-in"} to="/">
          <img alt="a" class="rp-logo-image" src={boardLogo} />
          {isLoggedIn && loggedInButton}
        </NavLink>
        {isLoggedIn && (
          <TotalUserPoints
            setBackButtonIsActive={props.setBackButtonIsActive}
          />
        )}
        {timeoutWarningActive && logoutWarning}
      </div>
    </header>
  );
};

export default Header;

const leftArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="chevron-left"
    class="svg-inline--fa fa-chevron-left fa-w-10"
    role="img"
    viewBox="0 0 320 512"
  >
    <path
      fill="currentColor"
      d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
    />
  </svg>
);
