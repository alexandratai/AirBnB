import "./SpotCard.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import { useState } from "react";
import { Modal } from "../../context/Modal";

const SpotCard = ({ spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const currentOwner = sessionUser.id === spot.ownerId;

  const [showModal, setShowModal] = useState(false);

  const deleteSpot = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spot.id));
    history.push(`/`);
  }

  const spotInfo = () => {
    history.push(`/spots/${spot.id}`);
  };

  const editSpotInfo = () => {
    history.push(`/spots/${spot.id}/edit`)
  };

  // const createReview = () => {
  //   history.push(`/spots/${spot.id}/reviews/create`)
  // }

  return (
    <div className="spot-card">
      <div className="text">{spot.name}</div>
      <div className="img-div">
      <img src={spot.previewImage} alt="img" className="preview-image" />
      </div>
      <br></br>
      <div className="buttons">
      <button onClick={spotInfo}>View Spot</button>
      {currentOwner && <button onClick={editSpotInfo}>Edit Spot</button>}
      {currentOwner && <button onClick={() => setShowModal(true)}>Delete Spot</button>}
      </div>

      {/* {(!currentOwner && sessionUser.id) && <button onClick={createReview}>Write Review</button>} */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <p className="pop-up">Are you sure you want to delete this spot?</p>
          <button className="pop-up-button" onClick={deleteSpot}>Delete</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default SpotCard;
