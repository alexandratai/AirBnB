import "./SpotPage.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allSpots } from "../../store/spots";
import SpotGrid from "../SpotGrid";

const SpotPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allSpots());
    }, []);

    return (
        <div>
            <SpotGrid />
        </div>
    )
}

export default SpotPage;