import "./UserSpotsButton.css";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const UserSpotsButton = () => {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    const getSpots = () => {
        history.push(`/users/${sessionUser.id}/spots`);
    };

    return (
        <button className="profile-dropdown-button" onClick={getSpots}>My Spots</button>
    );
};
export default UserSpotsButton;