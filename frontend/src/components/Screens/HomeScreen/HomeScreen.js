import * as React from 'react';
// import { connect } from 'react-redux'; import {} from
// '../../../actions/userActions';
import { isMobile } from 'react-device-detect';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import Modal from '../../UIElements/Modal/Modal';
import Screen from '../Screen/Screen';
import PhoneNumberInput from '../../UIElements/PhoneNumberInput/PhoneNumberInput';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { login, logout } from '../../../actions/loginActions';
import { setUser, clearUser, addUserPoints, updateVisit } from '../../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import './HomeScreen.css';

const HomeScreen = (props) => {
	const [ sidebarIsActive, setSidebarIsActive ] = React.useState(true);
	const [ isCheckedIn, setIsCheckedIn ] = React.useState(false);
	const [ emailIsActive, setEmailIsActive ] = React.useState(false);
	const isLoggedIn = useSelector((state) => state.isLogged);
	const user = useSelector((state) => state.user);
	const checkinPointValue = 20;
	// const isLoggedIn = useSelector((state) => state.user.number !== 0);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const dispatch = useDispatch();
	const checkInHandler = (phoneNumber) => {
		console.log('phoneNumber', phoneNumber);
		dispatch(setUser({ id: 0, number: phoneNumber, points: 0 }));
		dispatch(login());
	};
	const checkOutHandler = () => {
		console.log('check out');
		dispatch(logout());
		dispatch(clearUser());
	};

	const closeModalHandler = () => {
		setEmailIsActive(false);
	};


	const updatePointsHandler = async () => {
		console.log('<--STARTING UPDATING POINTS');
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
			// ----- Temp comment out
			// console.log('Testing',moment().format("MMM Do YYYY") );
			// console.log('Testing2', responseData.user.visits.slice(-1)[0].date );
			// console.log('Testing3', moment().startOf(responseData.user.visits.slice(-1)[0].time).fromNow() );
			// if(moment().format("MMM Do YYYY") === responseData.user.visits.slice(-1)[0].date) {
			// 	console.log('same day login');
			// 	if (responseData.user.visits.slice(-1)[0].time) {
			// 		console.log('Need to wait more time' , responseData.user.visits.slice(-1)[0].time);
			// 	}
			// }
			// --- below was commented out already
			// if (moment().format("MMM Do YY") === arr.slice(-1)[0] )

			dispatch(addUserPoints(responseData.user.points));
			dispatch(updateVisit(responseData.user.visits));
		} catch (err) {
			console.log('error');
		}
	};

	const email = (
		<div className="mailing-list-container">
			<div>Want additional awards?</div>{' '}
			<button onClick={() => setEmailIsActive(true)}>Join our mailing list!</button>
		</div>
	);

	const checkedInContent = (
		<React.Fragment>
			<Modal className={'email-modal'} show={emailIsActive} onCancel={closeModalHandler}>
				<div className="email-container">
					<h2>Join Our Mailing List!</h2>
					<iframe
						title='email-iframe'
						id="email-iframe"
						src="https://www.catpurrccinos.com/email-embed"
						width="100%"
						height="650px"
					/>
				</div>
			</Modal>
			<div className="home-screen__buttons-container">
				<div className="button-wrapper">
					<NavLink to="store">
						<button id="redeem">
							<span>Reedem Loyalty Points</span>
							<span className="icon-wrapper">{store}</span>
						</button>
					</NavLink>
				</div>
				<div className="button-wrapper">
					<NavLink onClick={props.updatePointsHandler} to="check-in">
						<button className="blue" id="home-screen">
							<span>Check In</span>
							<span className="icon-wrapper">{mapMarker}</span>
						</button>
					</NavLink>
				</div>
			</div>
			{email}
		</React.Fragment>
	);

	React.useEffect(
		() => {
			const signInUser = async () => {
				try {
					const responseData = await sendRequest(
						`${process.env.REACT_APP_BACKEND_URL}/user/signin/${user.number}`,
						'POST'
					);
					console.log('responseData', responseData);
					await dispatch(
						setUser({
							id          : responseData.userData._id,
							number      : responseData.userData.number,
							points      : responseData.userData.points,
							redemptions : responseData.userData.redemptions,
							visits      : responseData.userData.visits
						})
					);
					// dispatch(setUser(responseData.user[0]));
				} catch (err) {
					console.log('error');
				}
			};
			if (isLoggedIn === true) {
				console.log('USE RUNN');
				signInUser();
			}
		},
		[ sendRequest, isLoggedIn ]
	);

	return (
		<Screen
			id="home"
			returnButtonOnClick={checkOutHandler}
			title='Welcome!'
			subTitle='Would you like to Check In or Redeem your Loyalty Points?' 
			showReturn={!isLoggedIn}
		>
			<div className="home-screen-inner-wrapper">
				{checkedInContent}
			</div>
		</Screen>
	);
};

export default HomeScreen;

const store = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
		data-prefix="fas"
		data-icon="store"
		className="svg-inline--fa fa-store fa-w-20"
		role="img"
		viewBox="0 0 616 512"
	>
		<path
			fill="currentColor"
			d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"
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
