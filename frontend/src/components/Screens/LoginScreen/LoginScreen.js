import React, { useEffect, useState } from "react";
// import { connect } from 'react-redux'; import {} from
// '../../../actions/userActions';
// import firebase from "../../../firebase";
import { isMobile } from "react-device-detect";
import { NavLink } from "react-router-dom";
import { addPhoneNumber } from "../../../GetFirebase";
import Modal from "../../UIElements/Modal/Modal";
import Screen from "../Screen/Screen";
import PhoneNumberInput from "../../UIElements/PhoneNumberInput/PhoneNumberInput";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { login, logout } from "../../../actions/loginActions";
import { setUser, clearUser } from "../../../actions/userActions";

import { useSelector, useDispatch } from "react-redux";
import "./LoginScreen.css";
import { useFirebase } from "../../../firebase";
import Loader from "../../UIElements/Loader/Loader";

let countdownInterval;
let timeout;
const LoginScreen = (props) => {
  //State
  const isLoggedIn = useSelector((state) => state.isLogged);
  const user = useSelector((state) => state.user);
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);

  //Database
  const { isLoading, getNumber } = useFirebase();

  //Redux
  const dispatch = useDispatch();

  //Functions
  const checkInHandler = (phoneNumber) => {
    getNumber(phoneNumber);
    // startCountdown();
  };

  const checkOutHandler = () => {
    console.log("check out");
    // dispatch(clearUser());
    // dispatch(logout());
    // clearSessionInterval();
    // clearSessionTimeout();
  };

  // const clearSessionTimeout = () => {
  //   clearTimeout(timeout);
  // };

  // const clearSessionInterval = () => {
  //   clearInterval(countdownInterval);
  // };

  // const startCountdown = () => {
  //   const delay = 1000 * 1;
  //   if (!isLoggedIn) {
  //     timeout = setTimeout(() => {
  //       let countDown = 6;
  //       setTimeoutCountdown(countDown);
  //       countdownInterval = setInterval(() => {
  //         console.log("interval");
  //         if (countDown > 0) {
  //           setTimeoutCountdown(--countDown);
  //         } else {
  //           checkOutHandler();
  //         }
  //       }, 1000);
  //     }, delay);
  //   }
  // };

  const checkedOutContent = (
    <React.Fragment>
      {isLoading && <Loader />}

      <div className="input-container">
        <PhoneNumberInput
          buttonType="log-in"
          buttonText="Log In"
          onClick={checkInHandler}
        />
      </div>
    </React.Fragment>
  );

  // useEffect(() => {
  //   checkOutHandler();
  // }, [isLoggedIn]);

  return (
    <Screen
      id="home"
      returnButtonOnClick={checkOutHandler}
      title="Catpurrccino's Rewards"
      subTitle="Check-In or Redeem Points by entering your phone number below."
      showReturn={!isLoggedIn}
    >
      <div className="home-screen-inner-wrapper">{checkedOutContent}</div>
    </Screen>
  );
};

export default LoginScreen;
