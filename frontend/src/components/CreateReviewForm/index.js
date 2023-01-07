import "./CreateReviewForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { allReviewsBySpotIdThunk } from "../../store/reviews";
import { makeReviewThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";

const CreateReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  // const [errors, setErrors] = useState([]);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  useEffect(() => {
    dispatch(allReviewsBySpotIdThunk(spotId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review,
      stars,
    };

    let createdReview = await dispatch(makeReviewThunk(spotId, payload));
    if (createdReview) {
      history.push(`/spots/${spotId}/reviews`);
    }
  };

  return sessionUser.id ? (
    <section>
      <form onSubmit={handleSubmit}>
        <label className="review-form">Create a Review:</label>
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
        />

        <button type="submit">Create New Review</button>
      </form>
    </section>
  ) : null;
};

export default CreateReviewForm;
