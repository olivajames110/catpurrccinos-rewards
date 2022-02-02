import React, { useState, useEffect } from 'react';
// import ReactDOM from "react-dom";
import SvgMap from '../../shared/components/UIElements/SvgMap/SvgMap';
import Button from '../../shared/components/FormElements/Button/Button';
import SideScrollContainer from '../../shared/components/UIElements/SideScrollContainer/SideScrollContainer';
import Users from '../../user/pages/Users';
import SearchInput from '../../shared/components/FormElements/SearchInput/SearchInput';
import ReactTooltip from 'react-tooltip';

import './Home.css';

const Home = () => {
	const [ isMobile, setIsMobile ] = useState(false);
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
	}, []);

	let handleResize = () => {
		let mobile;
		window.innerWidth < 650 ? (mobile = true) : (mobile = false);
		setIsMobile(mobile);
	};
	return (
		<React.Fragment>
			<SvgMap isMobile={isMobile} type="googles" title={'Favorite Places'} />
			<div className="add-place-button-container">
				<div className="add-place-wrapper">
					<Button className="rounded-plus" to="/places/new" />
					<span>Add Place</span>
				</div>
			</div>
			<div className="recent-users-container">
				<h2>Recent Users</h2>
				<Users />
			</div>
		</React.Fragment>
	);
};

export default Home;
