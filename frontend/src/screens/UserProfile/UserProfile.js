import React, { useState, useEffect, useContext, useRef } from 'react';
import Image from '../../shared/components/UIElements/Image/Image';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import PlaceList from '../../places/components/PlaceList/PlaceList';
import AllPlacesMap from '../../places/pages/AllPlacesMap/AllPlacesMap';
import ContentRow from './ContentRow/ContentRow';
import PlacesPreviewImage from './PlacesPreviewImage/PlacesPreviewImage';
import { ReactComponent as Cross } from '../../shared/icons/times.svg';
import { ReactComponent as Expand } from '../../shared/icons/expand.svg';

import './UserProfile.css';

const UserProfile = () => {
	const auth = useContext(AuthContext);
	const [ loadedPlaces, setLoadedPlaces ] = useState([]);
	const [ previewPlace, setPreviewPlace ] = useState(false);
	const [ showImageModal, setShowImageModal ] = useState(false);
	const [ isMobile, setIsMobile ] = useState(false);
	const [ user, setUser ] = useState({ name: String, image: String });
	const [ preview, setPreview ] = useState({ title: String, description: String, address: String, image: String });
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const userId = useParams().userId;

	let handleResize = () => {
		let mobile;
		window.innerWidth < 650 ? (mobile = true) : (mobile = false);
		setIsMobile(mobile);
		console.log('change');
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
	}, []);

	useEffect(
		() => {
			const fetchUser = async () => {
				try {
					const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
					console.log('Loaded Users', responseData.users);
					const user = responseData.users.filter((user) => user.id === userId);
					console.log('User', user[0]);
					setUser(user[0]);
				} catch (err) {
					console.log(err.message);
				}
			};
			const fetchPlaces = async () => {
				try {
					const responseData = await sendRequest(
						`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
					);
					console.log('places-users', responseData.places);
					setLoadedPlaces(responseData.places);
					// setPreviewPlace(responseData.places);
					// setPreview({
					// 	title       : responseData.places[0].title,
					// 	description : responseData.places[0].description,
					// 	address     : responseData.places[0].address,
					// 	image       : responseData.places[0].image.location
					// });
				} catch (err) {}
			};
			fetchUser();
			fetchPlaces();
		},
		[ sendRequest, userId ]
	);

	const placeDeletedHandler = (deletedPlaceId) => {
		setLoadedPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== deletedPlaceId));
	};

	const clearPreview = () => {
		setPreview(false);
		setPreviewPlace([]);
	};
	const updatePreview = (place) => {
		console.log('place', place);
		let placePreview = loadedPlaces.filter((p) => p.address === place.address);
		setPreviewPlace(placePreview);
		setPreview({ title: place.title, description: place.description, address: place.address, image: place.image });
	};

	const pageContent_userProfileContainer = (
		<div className="user-profile">
			<div className="user-profile__image">
				<img src={user.image.location} alt="" />
			</div>
			<div className="user-profile__content">
				<h1>{`${user.name}'s Travel Map`}</h1>
				<h3>{loadedPlaces.length} Places Visited</h3>
			</div>
		</div>
	);

	const pageContent_preview = (
		<ContentRow id="places" title="Visited Places">
			<div className="places-container">
				<div className="places-list">
					<PlaceList
						preview={preview}
						updatePreview={updatePreview}
						onDeletePlace={placeDeletedHandler}
						items={loadedPlaces}
					/>
				</div>
				{previewPlace.length === 1 && (
					<PlacesPreviewImage
						title={preview.title}
						description={preview.description}
						address={preview.address}
						image={preview.image}
						setShowImageModal={setShowImageModal}
					/>
				)}
			</div>
		</ContentRow>
	);

	const pageContent_preview__mobile = (
		<ContentRow id="places-mobile" title="Visited Places">
			<div className="places-container_mobile ">
				<div className="places-list_mobile">
					<PlaceList
						listStyle="card"
						preview={preview}
						updatePreview={updatePreview}
						onDeletePlace={placeDeletedHandler}
						items={loadedPlaces}
					/>
				</div>
			</div>
		</ContentRow>
	);

	const pageContent_userProfileMapContainer = (
		<div className={`user-places__map-container ${preview ? 'preview__active' : 'preview__active'}`}>
			<div className="places-map-wrapper">
				<AllPlacesMap previewPlace={previewPlace} loadedPlaces={loadedPlaces} />
			</div>
			{previewPlace.length === 1 && (
				<div className="place-preview-pane">
					<h2 id="preview__title">{preview.title}</h2>
					<div id="preview__address">
						<span>{preview.address}</span>
					</div>
					<h3 id="preview__description">{preview.description}</h3>
					<div onClick={clearPreview} className="clear-preview">
						<Cross />
					</div>
				</div>
			)}
		</div>
	);

	const modalHeaderContent = (
		<div className="place-preview__content">
			<h2 id="preview__title">{preview.title}</h2>
			<h3 id="preview__address">{preview.address}</h3>
		</div>
	);

	const pageContent = (
		<React.Fragment>
			<Modal
				show={showImageModal}
				onCancel={() => setShowImageModal(false)}
				header={modalHeaderContent}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
			>
				<div className="modal-image-container">
					<Image src={preview.image} />
				</div>
			</Modal>
			{pageContent_userProfileContainer}

			<div className="user-places-body">
				<ContentRow id="map" title="Map">
					{pageContent_userProfileMapContainer}
				</ContentRow>

				{!isMobile ? pageContent_preview : pageContent_preview__mobile}
			</div>
		</React.Fragment>
	);

	// const afterTesting = (
	// 	<React.Fragment>
	// 		{isLoading && (
	// 			<div className="center">
	// 				<LoadingSpinner />
	// 			</div>
	// 		)}

	// 		{!isLoading && loadedPlaces && { pageContent }}
	// 	</React.Fragment>
	// )

	return pageContent;
};

export default UserProfile;
