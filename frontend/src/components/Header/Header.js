import * as React from 'react';

import { isMobile } from 'react-device-detect';
import { NavLink } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';

import Modal from '../UIElements/Modal/Modal';
import NavLinks from './NavLinks/NavLinks';
import { useSelector, useDispatch } from 'react-redux';

import SideDrawer from '../UIElements/SideDrawer/SideDrawer';
import './Header.css';

const Header = () => {
	const [ navIsOpen, setNavIsOpen ] = React.useState(false);
	const [ chatIsOpen, setChatIsOpen ] = React.useState(false);
	const isLoggedIn = useSelector((state) => state.isLogged);
	const closeDrawer = () => {
		setNavIsOpen(false);
	};

	// const modalTestHandler = () => { 		setModalIsActive((prev) => !prev); };

	const sideDrawerContentLinks = (
		<SideDrawer closeDrawer={closeDrawer} show={navIsOpen}>
			<NavLinks />
		</SideDrawer>
	);

	const chatClickHandler = () => {
		setChatIsOpen((d) => !d);
		setNavIsOpen(false);
	};
	const navClickHandler = () => {
		setNavIsOpen((d) => !d);
		setChatIsOpen(false);
	};
	const mobileButton = (
		<button onClick={navClickHandler} className="hamburger-icon-wrapper">
			<Hamburger distance="lg" duration={0.3} size={24} toggled={navIsOpen || chatIsOpen} />
		</button>
	);

	// {isLoggedIn && (
	// 	<NavLink className="return-button-wrapper" to="/">
	// 		<span className="return-icon-wrapper">{leftArrow}</span>
	// 		<span>Return Home</span>
	// 	</NavLink>
	// )}

	const boardLogo = 'https://digitalmarketing.blob.core.windows.net/10030/images/items/image719887.png';
	const fullLogo = 'https://digitalmarketing.blob.core.windows.net/11446/images/items/image568451.png';
	return (
		<header>
			<div className="header-inner-wrapper">
				<NavLink id="logo" className={isLoggedIn && 'logged-in'} to="/">
					<img alt="a" class="rp-logo-image" src={boardLogo} />
				</NavLink>
			</div>
			{sideDrawerContentLinks}
		</header>
	);
};

export default Header;

const leftArrow = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
		data-prefix="fas"
		data-icon="chevron-left"
		class="svg-inline--fa fa-chevron-left fa-w-10"
		role="img"
		viewBox="0 0 320 512"
	>
		<path
			fill="currentColor"
			d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
		/>
	</svg>
);
