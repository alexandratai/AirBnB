import "./UserReviewsButton.css";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const UserReviewButton = () => {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    const getReviews = () => {
        history.push(`/users/${sessionUser.id}/reviews`);
    };

    return (
        <button className="your-reviews-btn" onClick={getReviews}>My Reviews</button>
    );
};

export default UserReviewButton;