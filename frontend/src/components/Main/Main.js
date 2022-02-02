import * as React from 'react';
// import { isMobile } from 'react-device-detect';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import moment from 'moment';
import ContentContainer from '../UIElements/ContentContainer/ContentContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {  addUserPoints, updateVisit } from '../../actions/userActions';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import CheckInScreen from '../Screens/CheckInScreen/CheckInScreen';
import StoreScreen from '../Screens/StoreScreen/StoreScreen';
import UserProfileScreen from '../Screens/UserProfileScreen/UserProfileScreen';
import './Main.css';


const Main = () => {
	const user = useSelector((state) => state.user);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	// const [ isEnoughTimePassed, setEnoughTimePassed ] = React.useState(true);
	const dispatch = useDispatch();
	const checkinPointValue = 20;
	const updatePointsHandler = async () => {
		console.log('<--STARTING UPDATING POINTS');
		const isEnoughTimePassed = true;
			
			// console.log('Testing',moment().format("MMM Do YYYY") );
			// console.log('Testing2', user.visits.slice(-1)[0].date );
			// console.log('Testing3', moment().startOf(user.visits.slice(-1)[0].time).fromNow() );
			// if(moment().format("MMM Do YYYY") === user.visits.slice(-1)[0].date) {
			// 	console.log('same day login');
			// 	if (responseData.user.visits.slice(-1)[0].time) {
			// 		console.log('Need to wait more time' , responseData.user.visits.slice(-1)[0].time);
			// 	}
			// }
		try {
			const body = {
				id             : user.id,
				number         : user.number,
				points         : checkinPointValue,
				isAddingPoints : true
			};
			console.log('body', body);
			const bodyJSON = JSON.stringify(body);
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/user/update`,
				'PATCH',
				bodyJSON,
				{
					'Content-Type' : 'application/json'
				}
			);
	
			console.log('POST RESPONSE DATA', responseData);
			dispatch(addUserPoints(responseData.user.points));
			dispatch(updateVisit(responseData.user.visits));
		} catch (err) {
			console.log('error');
		}
	};
	return (
		<main>
			<ContentContainer>
			<Switch>
		<Route path="/" exact>
			<HomeScreen updatePointsHandler={updatePointsHandler}/>
		</Route>
		<Route path="/check-in" exact>
			<CheckInScreen />
		</Route>
		<Route path="/store" exact>
			<StoreScreen />
		</Route>
		<Route path="/profile" exact>
			<UserProfileScreen />
		</Route>
		<Redirect push to="/" />
	</Switch>
			</ContentContainer>
		</main>
	);
};

export default Main;
