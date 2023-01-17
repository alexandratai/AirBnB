import "./UserReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteReviewThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";

const UserReviews = ({ review }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const editReviewInfo = () => {
    history.push(`/spots/${review.spotId}/reviews/${review.id}/edit`);
  };

  const deleteReview = (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(review));
    history.push(`/users/${sessionUser.id}/reviews`);
  };

  return (
    <div>
            <div className="user-rvw" key={review.id}>
              <div className="rvw">
                {sessionUser.firstName}'s Review for <br></br>
                <b>{review.Spot.name}</b>:<br></br>"{review.review}"
              </div>
              <div className="rating">
                <u>Rated</u>: {review.stars}
              </div>
              <div className="btn-outer">
                {review.userId === sessionUser.id && (
                  <button className="btn" onClick={editReviewInfo}>
                    Edit Review
                  </button>
                )}
              </div>
              <div className="btn-outer">
                {review.userId === sessionUser.id && (
                  <button className="btn" onClick={() => setShowModal(true)}>
                    Delete Review
                  </button>
                )}
              </div>
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <div className="pop-up-box">
                    <p className="pop-up-text">
                      Are you sure you want to delete this review?
                    </p>
                    <div className="btn-box">
                      <div className="pop-up-button-div">
                        <button className="pop-up-button" onClick={deleteReview}>
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
    </div>
  );
};

export default UserReviews;
