import "./UserSpotsGrid.css";
import UserSpots from "../UserSpots";
import { allSpotsByUserIdThunk } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const UserSpotsGrid = () => {
  // map and filter
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const sessionSpotsObj = useSelector((state) => state.spots);
  const sessionSpotsArr = Object.values(sessionSpotsObj);
  const spots = sessionSpotsArr.filter((spot) => {
    return spot.ownerId === sessionUser.id;
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(allSpotsByUserIdThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

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

  return spots.length > 0 ? (
    <>
    <div className="your-spots-header">{sessionUser.firstName}'s Spots</div><br></br>
      <div className="my-spots">
        {isLoaded &&
          spots.map((spot) => {
            return <UserSpots key={spot.id} spot={spot} />;
          })}
      </div>

      <div className="footer-text">Made by + Technologies:</div>
      <div className="footer-buttons">
        <a
          href="https://github.com/alexandratai"
          target="_blank"
          rel="noreferrer"
        >
          <div className="made-by-div">
            <button className="made-by">
              <i className="fa-brands fa-github"></i>
            </button>
          </div>
        </a>
        <div className="code-div">
          <button className="code" onClick={openMenu}>
            <i className="fa-solid fa-code"></i>
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="code-dropdown">
          Built with Node.js, Express, Sequelize, Sqlite3, <br></br>React,
          Redux, HTML5, CSS, Git, JavaScript
        </div>
      )}
    </>
  ) : (
    <>
      <p className="no-spots-owned">You do not own any spots.</p>

      <div className="footer-text">Made by + Technologies:</div>
      <div className="footer-buttons">
        <a
          href="https://github.com/alexandratai"
          target="_blank"
          rel="noreferrer"
        >
          <div className="made-by-div">
            <button className="made-by">
              <i className="fa-brands fa-github"></i>
            </button>
          </div>
        </a>
        <div className="code-div">
          <button className="code" onClick={openMenu}>
            <i className="fa-solid fa-code"></i>
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="code-dropdown">
          Built with Node.js, Express, Sequelize, Sqlite3, <br></br>React,
          Redux, HTML5, CSS, Git, JavaScript
        </div>
      )}
    </>
  );
};

export default UserSpotsGrid;
