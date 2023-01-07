import "./SpotCard.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import { useState } from "react";
import { Modal } from "../../context/Modal";

const SpotCard = ({ spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const sessionUser = useSelector((state) => state.session.user);
  const currentOwner = sessionUser.id === spot.ownerId;

  return (
    <div className="spot-card">
      <div>{spot.name}</div>
      <img src={spot.previewImage} alt="img" className="preview-image" />
      <br></br>
      <button onClick={spotInfo}>See Spot Info</button>
      {currentOwner && <button onClick={editSpotInfo}>Edit Spot</button>}
      {currentOwner && <button onClick={() => setShowModal(true)}>Delete Spot</button>}
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
