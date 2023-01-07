import "./SpotInformation.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allSpots } from "../../store/spots";

const SpotInformation = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      dispatch(allSpots()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <div>
      {spot && (
        <>
          <h1>{spot.name}</h1>
          <h2>{spot.address}</h2>
          <p>{spot.description}</p>
        </>
      )}
    </div>
  );
};

export default SpotInformation;
