import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots"; // Actions
const ADD_SPOT = "spots/addSpot";

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

export const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
};

export const makeSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(addSpot(newSpot));
        return newSpot;
    }
}

export const allSpots = () => async (dispatch) => { // Thunk
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    dispatch(getSpots(data.Spots));
    return response;
}

const initialState = {};

const spotReducer = (state = initialState, action) => { // If nothing is passed in then, state = initialState
    let newState = { ...state }
    switch (action.type) {
        case GET_SPOTS:
            // console.log(action);
            action.spots.forEach(spot => { // Refers to line 8
                newState[spot.id] = spot;
            })
            return newState;
        case ADD_SPOT: // Can use this for updating as well later.
            newState[action.spot.id] = action.spot
            return newState;
        default:
            return state;
    }
};

export default spotReducer;