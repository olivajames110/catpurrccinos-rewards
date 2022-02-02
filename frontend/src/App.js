import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import './shared/css/global.css';
// workaround for react-awesome-button css import bug

import Header from './components/Header/Header';
import Main from './components/Main/Main';
// import CheckInScreen from './components/Screens/CheckInScreen/CheckInScreen';
import HomeScreen from './components/Screens/HomeScreen/HomeScreen';
import LoginScreen from './components/Screens/LoginScreen/LoginScreen';


const App = () => {
	// const vertNav =   {!isMobile && <VerticalNavigation />}
	const isLoggedIn = useSelector((state) => state.isLogged);
	return (
		<Router>
			<Header />
			<div className="app-body-wrapper">
				{isLoggedIn ? <Main/> : <LoginScreen/>}	
			</div>
		</Router>
	);
};

export default App;
