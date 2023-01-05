import { allSpots } from "../../store/spots";
import { useSelector } from "react-redux";
import './SpotGrid.css';

const SpotGrid = () => {
    const spotsObject = useSelector(state => state.spots);
    const spots = Object.values(spotsObject);

    return (
        <div>
            {spots.length > 0 && spots.map(spot => { // If spots.length > 0 THEN spots.map
                return <div key={spot.id}>{spot.address}</div>
            })}
        </div>
    )
}

export default SpotGrid;