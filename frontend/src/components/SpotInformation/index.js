import "./SpotInformation.css";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allSpotsThunk } from "../../store/spots";
import { deleteSpotThunk } from "../../store/spots";
import { Modal } from "../../context/Modal";
import ReviewCard from "../ReviewCard";
import { allReviewsBySpotIdThunk } from "../../store/reviews";

const SpotInformation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const reviewsObj = useSelector((state) => state.reviews);
  const initialReviewsArr = Object.values(reviewsObj);
  const reviewsArr = initialReviewsArr.filter((review) => {
    return parseInt(spotId) === review.spotId;
  })
  const sessionUser = useSelector((state) => state.session.user);
  const sessionUserArr = Object.values(sessionUser);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  let currentOwner = false;
  if (spot && sessionUser.id) {
    currentOwner = sessionUser.id === spot.ownerId;
  }

  const userReview = reviewsArr.filter((review) => {
    return review.userId === sessionUser.id;
  });

  const editSpotInfo = () => {
    history.push(`/spots/${spot.id}/edit`);
  };

  const deleteSpot = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spot.id));
    history.push(`/`);
  };

  const createReview = () => {
    history.push(`/spots/${spotId}/reviews/create`);
  };

  useEffect(() => {
    dispatch(allSpotsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(allReviewsBySpotIdThunk(spotId));
  }, [dispatch, spotId]);

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

  return (
    <div>
      {spot && (
        <div className="container">
          <div className="name">{spot.name}</div>
          <div className="address">{spot.address}</div>
          <br></br>
          <img src={spot.previewImage} alt="img" className="image" />
          <div className="description">{spot.description}</div>
          <div className="group-btn-div">
            <div className="btn-dvdr">
              {currentOwner && (
                <button className="button" onClick={editSpotInfo}>
                  Edit Spot
                </button>
              )}
            </div>
            <div className="btn-dvdr">
              {currentOwner && (
                <button className="button" onClick={() => setShowModal(true)}>
                  Delete Spot
                </button>
              )}
            </div>
            <div className="btn-dvdr">
              {!currentOwner &&
                userReview.length < 1 &&
                sessionUserArr.length > 0 && (
                  <button className="button" onClick={createReview}>
                    Write Review
                  </button>
                )}
            </div>
          </div>
          <br></br>
          {reviewsArr.length > 0 &&
            reviewsArr.map((review) => {
              return <ReviewCard key={review.id} review={review} />;
            })}

          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div className="pop-up-box">
                <p className="pop-up-text">
                  Are you sure you want to delete this spot?
                </p>
                <div className="btn-box">
                  <div className="pop-up-button-div">
                    <button className="pop-up-button" onClick={deleteSpot}>
                      Delete
                    </button>
                  </div>
                  <div className="pop-up-button-div">
                    <button
                      className="pop-up-button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}

      <div className="page-bottom-text">Made by + Technologies:</div>
      <div className="page-bottom-buttons">
        <a href="https://github.com/alexandratai" target="_blank" rel="noreferrer">
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
        <div className="tech-dropdown">
          Built with Node.js, Express, Sequelize, Sqlite3, <br></br>React,
          Redux, HTML5, CSS, Git, JavaScript
        </div>
      )}
    </div>
  );
};

export default SpotInformation;
