import * as React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import Modal from '../../../UIElements/Modal/Modal';\
import { useHttpClient } from '../../../../shared/hooks/http-hook';
import StoreItem from './StoreItem/StoreItem';
import { useSelector, useDispatch } from 'react-redux';
import TotalUserPoints from '../../../UIElements/TotalUserPoints/TotalUserPoints';
import { addUserPoints, subtractUserPoints, updateRedemption } from '../../../../actions/userActions';
import './Store.css';

const DUMMY_DRINK_ITEMS = [
	{ name: 'Coffee', price: '$2.89', description: 'Example description item', pointValue: 50 },
	{ name: 'Tea', price: '$2.89', description: 'Example description item', pointValue: 60 },
	{ name: 'Latte', price: '$2.89', description: 'Example description item', pointValue: 70 },
	{ name: 'Espresso', price: '$2.89', description: 'Example description item', pointValue: 90 },
	{ name: 'Soda', price: '$2.89', description: 'Example description item', pointValue: 100 }
];

const DUMMY_FOOD_ITEMS = [
	{ name: 'Sandwich', price: '$2.89', description: 'Example description item', pointValue: 50 },
	{ name: 'Salad', price: '$2.89', description: 'Example description item', pointValue: 60 },
	{ name: 'Wrap', price: '$2.89', description: 'Example description item', pointValue: 60 },
	{ name: 'Cookie', price: '$2.89', description: 'Example description item', pointValue: 15 },
	{ name: 'Brownie', price: '$2.89', description: 'Example description item', pointValue: 60 },
	{ name: 'Muffin', price: '$2.89', description: 'Example description item', pointValue: 700 }
];

const DUMMY_MERCH_ITEMS = [
	{ name: 'Mug', price: '$2.89', description: 'Example description item', pointValue: 50 },
	{ name: 'Shirt', price: '$2.89', description: 'Example description item', pointValue: 80 },
	{ name: 'Hat', price: '$2.89', description: 'Example description item', pointValue: 700 }
];
const DUMMY_CATTERY_ITEMS = [
	{ name: '1 person visit', price: '$20', description: 'Example description item', pointValue: 100 },
	{ name: '2 person visit', price: '$30', description: 'Example description item', pointValue: 120 },
	{ name: '3 person visit', price: '$40', description: 'Example description item', pointValue: 150 }
];

const Store = () => {
	const [ activeTab, setActiveTab ] = React.useState('Drinks');
	const [ storeItemList, setStoreItemList ] = React.useState(DUMMY_DRINK_ITEMS);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const tabClickHandler = (item) => {
		setActiveTab(item.tab);
		setStoreItemList(item.items);
	};

	const updatePointsHandler = async (itemValue, itemName) => {
		console.log('<--STARTING UPDATING ITEMS');
		try {
			const body = {
				id        : user.id,
				number    : user.number,
				itemName  : itemName,
				itemValue : itemValue
			};
			const bodyJSON = JSON.stringify(body);
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/user/update-redemption`,
				'PATCH',
				bodyJSON,
				{
					'Content-Type' : 'application/json'
				}
			);

			console.log('POST RESPONSE DATA', responseData);
			dispatch(subtractUserPoints(responseData.user.points));
			dispatch(updateRedemption(responseData.user.redemptions));
		} catch (err) {
			console.log('error');
		}
	};

	const tabList = (
		<nav id="store__sub-nav-links">
			<button
				onClick={() => tabClickHandler({ tab: 'Drinks', items: DUMMY_DRINK_ITEMS })}
				onKeyDown={() => tabClickHandler({ tab: 'Drinks', items: DUMMY_DRINK_ITEMS })}
				className={`nav-link__title ${activeTab === 'Drinks' && 'active'}`}
			>
				Drinks
			</button>
			<button
				onClick={() => tabClickHandler({ tab: 'Food', items: DUMMY_FOOD_ITEMS })}
				onKeyDown={() => tabClickHandler({ tab: 'Food', items: DUMMY_FOOD_ITEMS })}
				className={`nav-link__title ${activeTab === 'Food' && 'active'}`}
			>
				Food
			</button>
			<button
				onClick={() => tabClickHandler({ tab: 'Merchandise', items: DUMMY_MERCH_ITEMS })}
				onKeyDown={() => tabClickHandler({ tab: 'Merchandise', items: DUMMY_MERCH_ITEMS })}
				className={`nav-link__title ${activeTab === 'Merchandise' && 'active'}`}
			>
				Merchandise
			</button>
			<button
				onClick={() => tabClickHandler({ tab: 'Cattery', items: DUMMY_CATTERY_ITEMS })}
				onKeyDown={() => tabClickHandler({ tab: 'Cattery', items: DUMMY_CATTERY_ITEMS })}
				className={`nav-link__title ${activeTab === 'Cattery' && 'active'}`}
			>
				Cattery
			</button>
		</nav>
	);

	const activeTabContent = (
		<div className="items-container">
			{storeItemList.map((i) => (
				<StoreItem
					name={i.name}
					itemPoints={i.pointValue}
					price={i.price}
					description={i.description}
					userPoints={user.points}
					updateUser={updatePointsHandler}
				/>
			))}
		</div>
	);

	return (
		<React.Fragment>
			<div id="store-container">
				{tabList}
				{activeTabContent}
			</div>
		</React.Fragment>
	);
};

export default Store;
