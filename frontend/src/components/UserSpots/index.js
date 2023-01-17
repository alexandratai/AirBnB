import "./UserSpots.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { deleteSpotThunk } from "../../store/spots";
import { Modal } from "../../context/Modal";

const UserSpots = ({ spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const editSpotInfo = () => {
    history.push(`/spots/${spot.id}/edit`);
  };

  const deleteSpot = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spot.id));
    history.push(`/`);
  };

  return (
    <div className="user-spots">
      <div className="user-spots-name">{spot.name}</div>
      <div className="user-spots-address">{spot.address}</div>
      <br></br>
      <img src={spot.previewImage} alt="img" className="user-spots-img" />
      <br></br>
      <div className="user-btns-all">
        <div className="user-btns">
          <button className="user-spots-edit" onClick={editSpotInfo}>
            Edit Spot
          </button>
        </div>
        <div className="user-btns">
          <button
            className="user-spots-delete"
            onClick={() => setShowModal(true)}
          >
            Delete Spot
          </button>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="user-spots-modal">
            <p className="user-spots-modal-text">
              Are you sure you want to delete this spot?
            </p>
            <div className="user-spots-modal-btns">
              <div className="user-spots-modal-btn">
                <button className="user-spots-delete" onClick={deleteSpot}>
                  Delete
                </button>
              </div>
              <div className="user-spots-modal-btn">
                <button
                  className="user-spots-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      </div>
  )};

export default UserSpots;
