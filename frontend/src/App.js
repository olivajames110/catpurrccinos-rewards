import React, { useEffect } from "react";
import { useFirebase } from "./firebase";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "./shared/css/global.css";
import "./shared/css/mobile/mobile.css";
// workaround for react-awesome-button css import bug

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import LoginScreen from "./components/Screens/LoginScreen/LoginScreen";
import { clearUser } from "./actions/userActions";

const App = () => {
  // const { isLoading, error, data, getNumber, updateNumberData, createNewUser } =
  //   useFirebase();
  const [backButtonIsActive, setBackButtonIsActive] = React.useState(false);
  const isLoggedIn = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    // const testNumber = "6314563373";
    //---Tests
    // createNewUser(testNumber);
    // getNumber(testNumber);
    // updateNumberData(testNumber);
    //---
    if (!isLoggedIn) {
      dispatch(clearUser());
    }
  }, [isLoggedIn]);
  // const vertNav =   {!isMobile && <VerticalNavigation />}
  return (
    <Router>
      <Header
        backButtonIsActive={backButtonIsActive}
        setBackButtonIsActive={setBackButtonIsActive}
      />
      <div className="app-body-wrapper">
        {isLoggedIn ? (
          <Main setBackButtonIsActive={setBackButtonIsActive} />
        ) : (
          <LoginScreen />
        )}
      </div>
    </Router>
  );
};

export default App;
