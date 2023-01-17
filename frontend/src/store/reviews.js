import { csrfFetch } from "./csrf";

const GET_REVIEWS_SPOT = "spots/getReviewsBySpotId";
const ADD_REVIEW = "spots/addReview";
const EDIT_REVIEW = "spots/editReview";
const DELETE_REVIEW = "spots/deleteReview";
const GET_REVIEWS_USER = "spots/getReviewsByUserId";

const getReviewsBySpotId = (reviews) => {
  return {
    type: GET_REVIEWS_SPOT,
    reviews,
  };
};

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

const editReview = (review) => {
  return {
    type: EDIT_REVIEW,
    review,
  };
};

const deleteReview = (review) => {
  return {
    type: DELETE_REVIEW,
    review,
  };
};

const getReviewsByUserId = (reviews) => {
  return {
    type: GET_REVIEWS_USER,
    reviews,
  };
};

export const allReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();
  dispatch(getReviewsBySpotId(data.Reviews));
  return response;
};

export const makeReviewThunk = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(addReview(newReview));
    return newReview;
  }
};

export const editReviewThunk = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(editReview(newReview));
    return newReview;
  }
};

export const deleteReviewThunk = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(review));
  }
};

export const allReviewsByUserIdThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/me/reviews`);
  const data = await response.json();
  dispatch(getReviewsByUserId(data.Reviews));
  return response;
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_REVIEWS_SPOT:
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case ADD_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case EDIT_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.review.id];
      return newState;
    case GET_REVIEWS_USER:
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
