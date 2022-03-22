import React from "react";
import "./TotalUserPoints.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const TotalUserPoints = (props) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="current-points-container">
      <span>Catpurrccino Loyalty Points</span>
      <span id="value"> {user.points}</span>
      <NavLink
        onClick={() => props.setBackButtonIsActive(true)}
        id="number"
        to="/profile"
      >
        <span>View Profile</span>
      </NavLink>
    </div>
  );
};

export default TotalUserPoints;
