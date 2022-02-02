import React from 'react';
import './ContentRow.css';
const ContentRow = (props) => {
	return (
		<div id={props.id} className="content-row-container">
			<h2 className="content-title">{props.title}</h2>
			<div className="content-row">{props.children}</div>
		</div>
	);
};

export default ContentRow;
