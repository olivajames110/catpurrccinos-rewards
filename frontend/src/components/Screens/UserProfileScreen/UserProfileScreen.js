import * as React from "react";
import { NavLink } from "react-router-dom";
import { isMobile } from "react-device-detect";
// import 'react-phone-number-input/style.css';
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./UserProfileScreen.css";
import Screen from "../Screen/Screen";
import { useSelector, useDispatch } from "react-redux";
import { addUserPoints, setUser } from "../../../actions/userActions";
import AnimatedNumber from "animated-number-react";
import { formatPhoneNumber } from "../../../shared/utils/formatPhoneNumber";
const UserProfileScreen = () => {
  const user = useSelector((state) => state.user);
  const [redemptionsIsActive, setRedemptionsIsActive] = React.useState(false);
  const [list, setList] = React.useState([]);
  const dispatch = useDispatch();

  const tabSwitcherHandler = (bool, list) => {
    let sortedList = list.reverse();
    setRedemptionsIsActive(bool);
    setList(sortedList);
  };

  const noItems = (
    <div className="list-item-row empty" style={{ justifyContent: "center" }}>
      There are currently no {redemptionsIsActive ? "redemptions " : "visits "}
      for this user.
    </div>
  );

  const visitListItems = (
    <React.Fragment>
      {list.map((i) => (
        <ListItem item={i} />
      ))}
    </React.Fragment>
  );

  const redemptionListItems = (
    <React.Fragment>
      {list.map((i) => (
        <ListItem item={i} />
      ))}
    </React.Fragment>
  );

  const listItems = redemptionsIsActive ? redemptionListItems : visitListItems;

  React.useEffect(() => {
    let visits = [...user.visits];
    console.log("Visits", visits.length);
    if (visits.length > 1) {
      setList(visits.reverse());
    } else {
      setList(visits);
    }
  }, []);

  return (
    <Screen id="user-profile" title={`Customer Profile`}>
      <h2>{`${
        redemptionsIsActive ? "Redemptions" : "Visits"
      } For  ${formatPhoneNumber(user.number)} `}</h2>
      <nav>
        <ul>
          <li
            onClick={() => tabSwitcherHandler(false, user.visits)}
            className={`profile-tab ${!redemptionsIsActive && "active"}`}
          >
            Visits
          </li>
          <li
            onClick={() => tabSwitcherHandler(true, user.redemptions)}
            className={`profile-tab ${redemptionsIsActive && "active"}`}
          >
            Redemptions
          </li>
        </ul>
      </nav>
      <div className="list-item-container">
        {list.length === 0 ? noItems : listItems}
      </div>
    </Screen>
  );
};

export default UserProfileScreen;
const ListItem = (props) => {
  return <div className="list-item-row">{props.item}</div>;
};
