import "./ReviewCard.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allReviewsBySpotIdThunk } from "../../store/reviews";

const ReviewCard = ({ review }) => {
  const history = useHistory();
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const reviewInfo = () => {
    history.push(`/spots/${spotId}/reviews`);
  };

  const sessionSpot = useSelector((state) => state.session.spots);
  const currentSpotReviews = sessionSpot.id === review.spotId;

  useEffect(() => {
    dispatch(allReviewsBySpotIdThunk(sessionSpot)).then(() => setIsLoaded(true))
  }, [dispatch])

// const spot = useSelector(state => state.spots(spotId));
// const review = useSelector(state => Object.values(state.reviews))

// useEffect(() => {
//     dispatch(allReviewsBySpotIdThunk(spotId)).then(() => setIsLoaded(true))
// }, [dispatch])

  return (
    <div>
      <h1>AAAAAAAAAAAA</h1>
    </div>
  )
};

export default ReviewCard;
