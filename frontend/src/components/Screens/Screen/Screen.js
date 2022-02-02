import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import 'react-phone-number-input/style.css';
import TotalUserPoints from '../../UIElements/TotalUserPoints/TotalUserPoints';
import { useSelector } from 'react-redux';
import './Screen.css';

const Screen = (props) => {
	const [ value, setValue ] = React.useState();
	const [ isCheckedIn, setIsCheckedIn ] = React.useState(false);
	// const isLoggedIn = useSelector((state) => state.isLogged);
	const isLoggedIn = useSelector((state) => state.user.number !== 0);
	return (
		<section id={`${props.id}-section`} className="screen">
			<div onClick={props.returnButtonOnClick} className="return-button-wrapper">
				{!props.showReturn && (
					<NavLink to="/">
						<button className="small">
							<span className="icon-wrapper">{leftArrow}</span>
							<span>Return Home</span>
						</button>
					</NavLink>
				)}
			</div>
			{isLoggedIn && <TotalUserPoints />}
			<h1>{props.title}</h1>
			{props.subTitle && <h3>{props.subTitle}</h3>}
			<div className="screen-content">{props.children}</div>
		</section>
	);
};

export default Screen;

// ICONS

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
