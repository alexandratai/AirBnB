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
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

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

    let createdReview = await dispatch(makeReviewThunk(spotId, payload))
    .catch(async (response) => {
      const data = await response.json();
      return setErrors([data.message])
    });

    if (createdReview) {
      history.push(`/spots/${spotId}`)
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
          min="1"
          max="5"
        />

        <button type="submit">Create New Review</button>
      </form>
    </section>
  ) : null;
};

export default CreateReviewForm;
