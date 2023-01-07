import "./SpotPage.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allSpotsThunk } from "../../store/spots";
import SpotGrid from "../SpotGrid";

const SpotPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allSpotsThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
            <SpotGrid />
        </div>
    )
}

export default SpotPage;