import "./SpotInformation.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { deleteSpotThunk } from "../../store/spots";
import { Modal } from "../../context/Modal";

const SpotInformation = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const editSpotInfo = () => {
    history.push(`/spots/${spot.id}/edit`);
  };

  const deleteSpot = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spot.id));
    history.push(`/`);
  };

  useEffect(() => {
    dispatch(allSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  const currentOwner = sessionUser.id === spot.ownerId;

  return (
    <div>
      {spot && (
        <>
          <h1 className="text">{spot.name}</h1>
          <h2 className="text">{spot.address}</h2>
          <img src={spot.previewImage} alt="img" className="image" />
          <p className="text">{spot.description}</p>
          {currentOwner && <button onClick={editSpotInfo}>Edit Spot</button>}
          {currentOwner && (
            <button onClick={() => setShowModal(true)}>Delete Spot</button>
          )}
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <p className="pop-up">
                Are you sure you want to delete this spot?
              </p>
              <button className="pop-up-button" onClick={deleteSpot}>
                Delete
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default SpotInformation;
