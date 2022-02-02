import React from 'react';

const KeyboardNumber = (props) => {
	const [ animationIsActive, setAnimationIsActive ] = React.useState(false);

	const animationHandler = () => {
		// console.log('run');
		setAnimationIsActive(true);
		// setTimeout(() => {
		// 	// console.log('ruan');
		// 	setAnimationIsActive(false);
		// }, 110);
	};

	const onClickHandler = () => {
		props.onClick(props.number);
		animationHandler();
	};
	return (
		<div onClick={onClickHandler} className={`number-item  ${props.className} ${animationIsActive && ''}`}>
			{props.number}
		</div>
	);
};

export default KeyboardNumber;
