import "./ReviewCard.css";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { Modal } from "../../context/Modal";
import { useState } from "react";

const ReviewCard = ({ review }) => {
  const history = useHistory();
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionReviewsObj = useSelector((state) => state.reviews);
  const sessionReviewsArr = Object.values(sessionReviewsObj);
  const reviews = sessionReviewsArr.find(
    (review) => review.userId === sessionUser.id
  );
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const editReviewInfo = () => {
    history.push(`/spots/${spotId}/reviews/${reviews.id}/edit`);
  };

  const deleteReview = (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(review));
    history.push(`/spots/${spotId}`);
  };

  return (
    <div className="review-cards">
      <div className="review">
        <b>{review.User && review.User.firstName}</b>: {review.review}
      </div>
      <div className="review-stars">
        <u>Rated</u>: {review.stars}/5
      </div>
      <div className="btn-outer">
      {review.userId === sessionUser.id && (
        <button className="btn" onClick={editReviewInfo}>Edit Review</button>
      )}
      </div>
      <div className="btn-outer">
      {review.userId === sessionUser.id && (
        <button className="btn" onClick={() => setShowModal(true)}>Delete Review</button>
      )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="review-delete-div">
            <p className="pop-up">
              Are you sure you want to delete this review?
            </p>
            <div className="btn-div">
              <div className="inner-divider">
                <button className="btn" onClick={deleteReview}>
                  Delete
                </button>
              </div>
              <div className="inner-divider">
                <button
                  className="btn"
                  onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReviewCard;
