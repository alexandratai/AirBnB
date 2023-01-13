import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import CreateSpotButton from "../CreateSpotButton";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <div className="nav-bar">
      <div className="button-div">
      <button className="button" onClick={openMenu}>
        <i className="fa-solid fa-user"></i>
      </button>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="info">
            <div className="username">{user.username}</div>
            <div className="email">{user.email}</div>
          </div><br></br>
            <CreateSpotButton />
            <button className="profile-dropdown-button" onClick={logout}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
