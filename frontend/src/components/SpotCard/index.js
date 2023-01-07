import "./SpotCard.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";

const SpotCard = ({ spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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
      {/* <img src={spot.previewImage} alt="img" /> */}
      <br></br>
      <button onClick={spotInfo}>See Spot Info</button>
      {currentOwner && <button onClick={editSpotInfo}>Edit Spot</button>}
      {currentOwner && <button onClick={deleteSpot}>Delete Spot</button>}
    </div>
  );
};

export default SpotCard;
