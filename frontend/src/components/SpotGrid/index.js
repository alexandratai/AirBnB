import { allSpotsThunk } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import SpotCard from "../SpotCard";
import './SpotGrid.css';
import { useEffect, useState } from "react";

const SpotGrid = () => {
    const dispatch = useDispatch();

    const spotsObject = useSelector(state => state.spots);
    const spotsArr = Object.values(spotsObject);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(allSpotsThunk()).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <div className="spot-grid">
            {spotsArr.length > 0 && spotsArr.map(spot => { // If spots.length > 0 THEN spots.map
                return <SpotCard className="spot-card" key={spot.id} spot={spot}/>
            })}
        </div>
    )
};

export default SpotGrid;