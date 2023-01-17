import "./SpotCard.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import { Link } from "react-router-dom";

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
  };

  const spotInfo = () => {
    history.push(`/spots/${spot.id}`);
  };

  const editSpotInfo = () => {
    history.push(`/spots/${spot.id}/edit`);
  };

  // const createReview = () => {
  //   history.push(`/spots/${spot.id}/reviews/create`)
  // }

  return (
    <div className="individual-spt-crds">
      <div className="spt-title">{spot.name}</div>
      <Link to={`spots/${spot.id}`}>
        <div className="img-div">
          <img src={spot.previewImage} alt="img" className="preview-image" />
        </div>
      </Link>
      <br></br>
      <div className="overall-div">
        <div className="buttons-div">
          <button className="button" onClick={spotInfo}>
            View Spot
          </button>
        </div>
        <div className="buttons-div">
          {currentOwner && (
            <button className="button" onClick={editSpotInfo}>
              Edit Spot
            </button>
          )}
        </div>
        <div className="buttons-div">
          {currentOwner && (
            <button className="button" onClick={() => setShowModal(true)}>
              Delete Spot
            </button>
          )}
        </div>
      </div>

      {/* {(!currentOwner && sessionUser.id) && <button onClick={createReview}>Write Review</button>} */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="delete-overall-div">
            <p className="pop-up">Are you sure you want to delete this spot?</p>
            <div className="button-box">
              <div className="pop-up-button-div">
                <button className="pop-up-button" onClick={deleteSpot}>
                  Delete
                </button>
              </div>
              <div className="pop-up-button-div">
                <button
                  className="pop-up-button"
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
  );
};

export default SpotCard;
