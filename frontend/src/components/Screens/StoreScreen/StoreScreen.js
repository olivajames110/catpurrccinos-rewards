import * as React from 'react';

import './StoreScreen.css';
import Screen from '../Screen/Screen';
import PhoneNumberInput from '../../UIElements/PhoneNumberInput/PhoneNumberInput';
import Store from './Store/Store';
const StoreScreen = () => {
	// testing const [modalIsActive, 		setModalIsActive] = React.useState < boolean
	// > (false);
	const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
	const storeContent = <div className="store-content-container">Store</div>;

	const logInHandler = () => {
		setIsLoggedIn(true);
	};

	const logInContent = (
		<React.Fragment>
			<h3>You can log in by entering your phone number below.</h3>
			<PhoneNumberInput buttonText="See My Rewards" onClick={logInHandler} />
		</React.Fragment>
	);
	return (
		<Screen id="store" title="Choose Your Rewards" subTitle={'What items would you like to redeem?'}>
			<Store />
		</Screen>
	);
};

export default StoreScreen;
