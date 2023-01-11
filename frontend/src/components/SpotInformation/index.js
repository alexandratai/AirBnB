import "./SpotInformation.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allSpotsThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";
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
  const reviewsArr = Object.values(reviewsObj);
  const sessionUser = useSelector((state) => state.session.user);
  const sessionUserArr = Object.values(sessionUser)

  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let currentOwner = false;
  if (spot && sessionUser.id) {
    currentOwner = sessionUser.id === spot.ownerId;
  };

  const userReview = reviewsArr.filter(review => {
    return review.userId === sessionUser.id
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
    history.push(`/spots/${spotId}/reviews/create`)
  }

  useEffect(() => {
    dispatch(allSpotsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(allReviewsBySpotIdThunk(spotId));
  }, [dispatch]);

  return (
    <div>
      {spot && (
        <div className="container">
          <h1 className="text">{spot.name}</h1>
          <h2 className="text">{spot.address}</h2>
          <div className="img-div">
          <img src={spot.previewImage} alt="img" className="image" />
          </div>
          <p className="text">{spot.description}</p>
          {currentOwner && <button onClick={editSpotInfo}>Edit Spot</button>}
          {currentOwner && (
            <button onClick={() => setShowModal(true)}>Delete Spot</button>
          )}
          {((!currentOwner && userReview.length < 1) && sessionUserArr.length > 0) && <button onClick={createReview}>Write Review</button>}

          {reviewsArr.length > 0 &&
            reviewsArr.map((review) => {
                return <ReviewCard key={review.id} review={review} />;
            })}

          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <p className="pop-up">
                Are you sure you want to delete this spot?
              </p>
              <button className="pop-up-button" onClick={deleteSpot}>
                Delete
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default SpotInformation;
