import React from 'react';
import { ReactComponent as Expand } from '../../../shared/icons/expand.svg';
import './PlacesPreviewImage.css';
const PlacesPreviewImage = (props) => {
	return (
		<div className="place-preview ">
			<div className="place-preview__image">
				<img src={props.image} alt="" />
			</div>
			<div id="view" className="icon-container">
				<span onClick={() => props.setShowImageModal(true)}>
					<Expand />
				</span>
			</div>
		</div>
	);
};

export default PlacesPreviewImage;
