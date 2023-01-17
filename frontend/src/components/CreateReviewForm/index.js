import "./CreateReviewForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
  const [showMenu, setShowMenu] = useState(false);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review,
      stars,
    };

    let createdReview = await dispatch(makeReviewThunk(spotId, payload)).catch(
      async (response) => {
        const data = await response.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if (createdReview) {
      history.push(`/spots/${spotId}`);
    }
  };

  return sessionUser.id ? (
    <section>
      <form className="create-review-form" onSubmit={handleSubmit}>
        <div className="errors">
          {errors.map((error, index) => (
            <li key={index}>Error: {error}</li>
          ))}
        </div>
        <div className="review-form">
          <p>Write a Review:</p>
          <input
            type="text"
            placeholder="Review here"
            value={review}
            onChange={updateReview}
          />

          <p>How would you rate<br></br>your experience?</p>
          <input
            type="number"
            placeholder="Stars here"
            value={stars}
            onChange={updateStars}
            min="1"
            max="5"
          />
          <div className="button-div">
            <button className="button" type="submit">
              Create New Review
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

export default CreateReviewForm;
