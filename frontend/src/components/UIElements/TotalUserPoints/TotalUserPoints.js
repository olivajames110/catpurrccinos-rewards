import React from 'react';
import './TotalUserPoints.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { formatPhoneNumber } from '../../../shared/utils/formatPhoneNumber';
const TotalUserPoints = () => {
	const user = useSelector((state) => state.user);
	return (
		<div className="current-points-container">
			<span>Loyalty Points</span>
			<span id="value"> {user.points}</span>
			<NavLink id="number" to="/profile">
				<span> {formatPhoneNumber(user.number)}</span>
			</NavLink>
		</div>
	);
};

export default TotalUserPoints;
