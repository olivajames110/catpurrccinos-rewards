import * as React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
// import Modal from '../../../UIElements/Modal/Modal';\

import { useHttpClient } from "../../../../shared/hooks/http-hook";
import StoreItem from "./StoreItem/StoreItem";
import { useSelector, useDispatch } from "react-redux";
import TotalUserPoints from "../../../UIElements/TotalUserPoints/TotalUserPoints";
import {
  drinkItems,
  foodItems,
  merchItems,
  catteryItems,
  vipItems,
} from "./StoreItemList";
import {
  addUserPoints,
  subtractUserPoints,
  updateRedemption,
} from "../../../../actions/userActions";
import "./Store.css";
import { useFirebase } from "../../../../firebase";

const Store = () => {
  const [activeTab, setActiveTab] = React.useState("Drinks");
  const [storeItemList, setStoreItemList] = React.useState(drinkItems);
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const user = useSelector((state) => state.user);
  const { updateNumberData } = useFirebase();
  const dispatch = useDispatch();

  const tabClickHandler = (item) => {
    setActiveTab(item.tab);
    setStoreItemList(item.items);
  };

  // const updatePointsHandler = async (itemValue, itemName) => {
  // 	console.log('<--STARTING UPDATING ITEMS');
  // 	updateNumberData()
  // 	try {
  // 		const body = {
  // 			id        : user.id,
  // 			number    : user.number,
  // 			itemName  : itemName,
  // 			itemValue : itemValue
  // 		};
  // 		const bodyJSON = JSON.stringify(body);
  // 		const responseData = await sendRequest(
  // 			`${process.env.REACT_APP_BACKEND_URL}/user/update-redemption`,
  // 			'PATCH',
  // 			bodyJSON,
  // 			{
  // 				'Content-Type' : 'application/json'
  // 			}
  // 		);

  // 		console.log('POST RESPONSE DATA', responseData);
  // 		dispatch(subtractUserPoints(responseData.user.points));
  // 		dispatch(updateRedemption(responseData.user.redemptions));
  // 	} catch (err) {
  // 		console.log('error');
  // 	}
  // };

  const tabList = (
    <nav id="store__sub-nav-links">
      <button
        onClick={() => tabClickHandler({ tab: "Drinks", items: drinkItems })}
        onKeyDown={() => tabClickHandler({ tab: "Drinks", items: drinkItems })}
        className={`nav-link__title ${activeTab === "Drinks" && "active"}`}
      >
        Drinks
      </button>
      <button
        onClick={() => tabClickHandler({ tab: "Food", items: foodItems })}
        onKeyDown={() => tabClickHandler({ tab: "Food", items: foodItems })}
        className={`nav-link__title ${activeTab === "Food" && "active"}`}
      >
        Food
      </button>
      <button
        onClick={() =>
          tabClickHandler({ tab: "Merchandise", items: merchItems })
        }
        onKeyDown={() =>
          tabClickHandler({ tab: "Merchandise", items: merchItems })
        }
        className={`nav-link__title ${activeTab === "Merchandise" && "active"}`}
      >
        Merchandise
      </button>
      <button
        onClick={() => tabClickHandler({ tab: "Cattery", items: catteryItems })}
        onKeyDown={() =>
          tabClickHandler({ tab: "Cattery", items: catteryItems })
        }
        className={`nav-link__title ${activeTab === "Cattery" && "active"}`}
      >
        Cattery
      </button>
      <button
        onClick={() => tabClickHandler({ tab: "VIP", items: vipItems })}
        onKeyDown={() => tabClickHandler({ tab: "VIP", items: vipItems })}
        className={`nav-link__title ${activeTab === "VIP" && "active"}`}
      >
        VIP
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
