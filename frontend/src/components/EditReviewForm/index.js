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
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(allReviewsBySpotIdThunk(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (reviewChange) {
      setReview(reviewChange.review);
      setStars(reviewChange.stars);
    }
  }, [reviewChange]);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

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
      <form className="edit-review-form" onSubmit={handleSubmit}>
        <div className="errors">
          {errors.map((error, index) => (
            <li key={index}>Error: {error}</li>
          ))}
        </div>
        <div className="review-form">
          <p>Edit Your Review:</p>
          <input className="input"
            required
            type="text"
            placeholder="Review here"
            value={review}
            onChange={updateReview}
          />
          <p>
            How would you rate<br></br>your experience?
          </p>
          <input className="input"
            required
            type="number"
            placeholder="Stars here"
            value={stars}
            onChange={updateStars}
            min="1"
            max="5"
          />
          <div className="edit-review-button-div">
            <button className="edit-review-button" type="submit">
              Edit Review
            </button>
          </div>
        </div>
      </form>
      
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
    </section>
  ) : null;
};

export default EditReviewForm;
