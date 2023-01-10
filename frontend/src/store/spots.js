import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots"; // Actions
const ADD_SPOT = "spots/addSpot";
const EDIT_SPOT = "spots/editSpot";
const DELETE_SPOT = "spots/deleteSpot";

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot,
  };
};

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

export const allSpotsThunk = () => async (dispatch) => {
  // Thunk
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
  dispatch(getSpots(data.Spots));
  return response;
};

export const makeSpotThunk = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(addSpot(newSpot));
    return newSpot;
  }
};

export const editSpotThunk = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spotEdited = await response.json();
    dispatch(editSpot(spotEdited));
    return spotEdited;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteSpot(spotId));
    }
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
  // If nothing is passed in then, state = initialState
  let newState = { ...state };
  switch (action.type) {
    case GET_SPOTS:
      // console.log(action);
      action.spots.forEach((spot) => {
        // Refers to line 8
        newState[spot.id] = spot;
      });
      return newState;
    case ADD_SPOT: // Can use this for updating as well later.
      newState[action.spot.id] = action.spot;
      return newState;
    case EDIT_SPOT:
      newState[action.spot.id] = action.spot;
      return newState;
    case DELETE_SPOT:
      delete newState[action.spotId];
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
