import * as React from "react";
// import Input from 'react-phone-number-input';
import Input from "react-phone-number-input/input";
import { NavLink } from "react-router-dom";
import "./PhoneNumberInput.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { setUser, clearUser } from "../../../actions/userActions";
import KeyboardNumber from "./KeyboardNumber";
const PhoneNumberInput = (props) => {
  // testing const [modalIsActive, 		setModalIsActive] = React.useState < boolean
  // > (false);
  const [isError, setIsError] = React.useState(false);
  const [value, setValue] = React.useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const onClickHandler = () => {
    console.log(value.length);

    if (value === undefined || value.length !== 12) {
      console.log("more");
      setIsError(true);
      return;
    }
    setValue("");
    props.onClick(value);
    // setIsCheckedIn(true);
  };

  const checkIfAwake = async () => {
    console.log("Checking if awake");
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/user/wake`
      );
      console.log("responseData", responseData);
    } catch (err) {
      console.log("error");
    }
  };

  const setValueHandler = (num) => {
    checkIfAwake();
    if (!value) {
      setValue(`+1${num}`);
    }

    if (value && value.length <= 11) {
      let numbers = value.concat(num);
      setValue(numbers);
      console.log(numbers);
    }
    // setValue(s=> s + num)
  };

  const deleteHandler = () => {
    let num = value.slice(0, -1);
    setValue(num);
  };
  const clearHandler = () => {
    setValue("");
  };

  const keyboard = (
    <div className="keyboard-container">
      <div className="non-zero-numbers">
        <KeyboardNumber onClick={setValueHandler} number="1" />
        <KeyboardNumber onClick={setValueHandler} number="2" />
        <KeyboardNumber onClick={setValueHandler} number="3" />
        <KeyboardNumber onClick={setValueHandler} number="4" />
        <KeyboardNumber onClick={setValueHandler} number="5" />
        <KeyboardNumber onClick={setValueHandler} number="6" />
        <KeyboardNumber onClick={setValueHandler} number="7" />
        <KeyboardNumber onClick={setValueHandler} number="8" />
        <KeyboardNumber onClick={setValueHandler} number="9" />
        <KeyboardNumber
          onClick={clearHandler}
          className={"delete"}
          number="Clear"
        />
        <KeyboardNumber
          className={"zero"}
          onClick={setValueHandler}
          number="0"
        />
        <KeyboardNumber
          onClick={deleteHandler}
          className={"delete"}
          number="Delete"
        />
      </div>
    </div>
  );

  return (
    <React.Fragment activeClassName="nav-link__active" to="/store" exact>
      <div className="phone-number-input-container">
        <label htmlFor="phone" />
        <Input
          country="US"
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
        />
        {isError && (
          <p className="error-message">
            Please enter your full 9 digit phone number excluding your area code
          </p>
        )}
        <NavLink
          onClick={onClickHandler}
          activeClassName="nav-link__active"
          to="/"
          exact
        >
          <button className="blue">
            <span>{props.buttonText}</span>
            <span className="icon-wrapper">
              {props.buttonType === "check-in" ? mapMarker : rightArrow}
            </span>
          </button>
        </NavLink>
      </div>
      {keyboard}
    </React.Fragment>
  );
};

export default PhoneNumberInput;
const rightArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="chevron-right"
    class="svg-inline--fa fa-chevron-right fa-w-10"
    role="img"
    viewBox="0 0 320 512"
  >
    <path
      fill="currentColor"
      d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
    />
  </svg>
);
const mapMarker = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="map-marker-alt"
    class="svg-inline--fa fa-map-marker-alt fa-w-12"
    role="img"
    viewBox="0 0 384 512"
  >
    <path
      fill="currentColor"
      d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
    />
  </svg>
);
