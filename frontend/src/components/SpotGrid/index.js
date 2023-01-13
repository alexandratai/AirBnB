import { allSpotsThunk } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import SpotCard from "../SpotCard";
import "./SpotGrid.css";
import { useEffect, useState } from "react";

const SpotGrid = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const spotsObject = useSelector((state) => state.spots);
  const spotsArr = Object.values(spotsObject);

  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    dispatch(allSpotsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="spot-grid">
        {spotsArr.length > 0 &&
          spotsArr.map((spot) => {
            // If spots.length > 0 THEN spots.map
            return <SpotCard className="spot-card" key={spot.id} spot={spot} />;
          })}
      </div>
      <br></br>

      <div className="page-bottom-text">Made by + Technologies:</div>
      <div className="page-bottom-buttons">
        <a href="https://github.com/alexandratai" target="_blank">
          <div className="github-div">
            <button className="github">
              <i className="fa-brands fa-github"></i>
            </button>
          </div>
        </a>
        <div className="tech-div">
          <button className="tech" onClick={openMenu}>
            <i className="fa-solid fa-code"></i>
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="tech-dropdown">Built with Node.js, Express, Sequelize, Sqlite3,  <br></br>React, Redux, HTML5, CSS, Git, JavaScript</div>
      )}
    </>
  );
};

export default SpotGrid;
