import "./SpotPage.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allSpots } from "../../store/spots";
import SpotGrid from "../SpotGrid";

const SpotPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
            <SpotGrid />
        </div>
    )
}

export default SpotPage;