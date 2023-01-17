import "./UserReviewsGrid.css";
import UserReviews from "../UserReviews";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { allReviewsByUserIdThunk } from "../../store/reviews";

const UserReviewsGrid = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  const reviewsObj = useSelector((state) => state.reviews);
  const initialReviewsArr = Object.values(reviewsObj);
  const reviewsArr = initialReviewsArr.filter(review => {
    return review.userId === sessionUser.id;
  })

  const [isLoaded, setIsLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(allReviewsByUserIdThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

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


  return reviewsArr.length > 0 ? (
    <>
    <div className="rvws-grid">
      {reviewsArr.length > 0 &&
        isLoaded &&
        reviewsArr.map((review) => {
          return <UserReviews key={review.id} review={review} />;
        })}
    </div>
    <div className="footer-text">Made by + Technologies:</div>
      <div className="footer-buttons">
        <a
          href="https://github.com/alexandratai"
          target="_blank"
          rel="noreferrer"
        >
          <div className="made-by-div">
            <button className="made-by">
              <i className="fa-brands fa-github"></i>
            </button>
          </div>
        </a>
        <div className="code-div">
          <button className="code" onClick={openMenu}>
            <i className="fa-solid fa-code"></i>
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="code-dropdown">
          Built with Node.js, Express, Sequelize, Sqlite3, <br></br>React,
          Redux, HTML5, CSS, Git, JavaScript
        </div>
      )}
    </>
  ) : (
    <>
    <p className="no-reviews">You have not written any reviews.</p>

    <div className="footer-text">Made by + Technologies:</div>
      <div className="footer-buttons">
        <a
          href="https://github.com/alexandratai"
          target="_blank"
          rel="noreferrer"
        >
          <div className="made-by-div">
            <button className="made-by">
              <i className="fa-brands fa-github"></i>
            </button>
          </div>
        </a>
        <div className="code-div">
          <button className="code" onClick={openMenu}>
            <i className="fa-solid fa-code"></i>
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="code-dropdown">
          Built with Node.js, Express, Sequelize, Sqlite3, <br></br>React,
          Redux, HTML5, CSS, Git, JavaScript
        </div>
      )}
    </>
  )
};

export default UserReviewsGrid;
