import { csrfFetch } from "./csrf";

const GET_REVIEWS_SPOT = "spots/getReviewsBySpotId";
const ADD_REVIEW = "spots/addReview";

const getReviewsBySpotId = (reviews) => {
    return {
        type: GET_REVIEWS_SPOT,
        reviews
    }
};

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

export const allReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getReviewsBySpotId(data.Reviews));
    return response;
};

// export const allReviewsBySpotIdThunk = (spot) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spot.id}/reviews`);
//     const data = await response.json();
//     dispatch(getReviewsBySpotId(spot));
//     return response;
// };

export const makeReviewThunk = (spot, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));
        return newReview;
    }
}

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_REVIEWS_SPOT:
            action.reviews.forEach(review => {
                newState[review.id] = review;
            });
            return newState;
        case ADD_REVIEW:
            newState[action.reviews.id] = action.reviews;
            return newState;
        default:
            return state
    }
};

export default reviewReducer;