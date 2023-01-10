import "./EditReviewForm.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { allReviewsBySpotIdThunk } from "../../store/reviews";
import { editReviewThunk } from "../../store/reviews";

const EditReviewForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId, reviewId } = useParams();
  const reviewChange = useSelector((state) => state.reviews[reviewId]);
  const history = useHistory();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(allReviewsBySpotIdThunk(spotId));
  }, [dispatch]);

  useEffect(() => {
    if (reviewChange) {
      setReview(reviewChange.review);
      setStars(reviewChange.stars);
    }
  }, [reviewChange]);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: reviewId,
      review,
      stars,
    };

    let editedReview = await dispatch(editReviewThunk(payload)).catch(
      async (response) => {
        const data = await response.json();
        return setErrors([data.message]);
      }
    );

    if (editedReview) {
      history.push(`/spots/${spotId}`);
    }
  };

  return sessionUser.id ? (
    <section>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <label className="review-form">Edit Your Review For This Spot:</label>
        <br></br>
        <input
          required
          type="text"
          placeholder="Review here"
          value={review}
          onChange={updateReview}
        />
        <input
          required
          type="number"
          placeholder="Stars here"
          value={stars}
          onChange={updateStars}
          min="1"
          max="5"
        />

        <button type="submit">Edit Review</button>
      </form>
    </section>
  ) : null;
};

export default EditReviewForm;
