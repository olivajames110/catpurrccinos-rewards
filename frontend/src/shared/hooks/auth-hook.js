import { useState, useCallback, useRef, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
	const [ token, setToken ] = useState(false);
	const [ tokenExpirationDateState, setTokenExpirationDateState ] = useState(false);
	const [ userId, setUserId ] = useState(false);
	const [ userName, setUserName ] = useState(false);

	const login = useCallback((responseUserData, token, expirationDate) => {
		console.log('userName', responseUserData);
		setToken(token);
		setUserId(responseUserData.userId);
		setUserName(responseUserData.userName);
		const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		// const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDateState(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId     : responseUserData.userId,
				userName   : responseUserData.userName,
				token      : token,
				expiration : tokenExpirationDate.toISOString()
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setUserName(null);
		setTokenExpirationDateState(null);
		localStorage.removeItem('userData');
	}, []);

	useEffect(
		() => {
			const storedData = { userData: JSON.parse(localStorage.getItem('userData')) };
			if (
				storedData.userData &&
				storedData.userData.token &&
				new Date(storedData.userData.expiration) > new Date()
			) {
				console.log('attempting to log in');
				login(storedData.userData, storedData.userData.token, new Date(storedData.userData.expiration));
			}
		},
		[ login ]
	);

	useEffect(
		() => {
			if (token && tokenExpirationDateState) {
				const remainingTime = tokenExpirationDateState.getTime() - new Date();
				logoutTimer = setTimeout(logout, remainingTime);
			} else {
				clearTimeout(logoutTimer);
			}
		},
		[ token, logout, tokenExpirationDateState ]
	);

	return { token, userId, userName, setUserName, login, logout };
};
