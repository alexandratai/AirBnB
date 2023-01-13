import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser.id) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className="nav-bar" to="/signup">
          <div className="button-div">
            <button className="button">
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </div>
        </NavLink>
      </>
    );
  }

  return (
    <ul>
      <li className="nav-bar">
        <NavLink className="nav-bar" exact to="/">
          <div className="button-div">
            <button className="button">
              <i className="fa-solid fa-house-chimney"></i>
            </button>
          </div>
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
