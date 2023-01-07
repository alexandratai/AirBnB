import "./CreateReviewButton.css";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const createReviewButton =  () => {
    const history = useHistory();
    const { spotId } = useParams();

    const createAReview = () => {
        history.push(`/spots/${spotId}/reviews/create`);
    };

    return (
        <button onClick={createAReview}>Create Review</button>
    )
}

export default createReviewButton;