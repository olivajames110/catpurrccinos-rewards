import * as React from 'react';
import './ContentContainer.css';

const ContentContainer = (props) => {
	return <div className="outer-content-wrapper">{props.children}</div>;
};

export default ContentContainer;
