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
  const reviews = sessionReviewsArr.find(review => review.userId === sessionUser.id);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const editReviewInfo = () => {
    history.push(`/spots/${spotId}/reviews/${reviews.id}/edit`)
  }

  const deleteReview = (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(review));
    history.push(`/spots/${spotId}`);
  }

  return (
    <>
      <div className="review">{review.review}</div>
      <div className="review-stars">{review.stars}</div>
      {(review.userId === sessionUser.id) && <button onClick={editReviewInfo}>Edit Review</button>}
      {(review.userId === sessionUser.id) && <button onClick={() => setShowModal(true)}>Delete Review</button>}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <p className="pop-up">Are you sure you want to delete this review?</p>
          <button className="pop-up-button" onClick={deleteReview}>Delete</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </>
  )
};

export default ReviewCard;
