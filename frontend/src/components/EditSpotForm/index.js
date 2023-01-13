import "./EditSpotForm.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { allSpotsThunk } from "../../store/spots";
import { editSpotThunk } from "../../store/spots";

const EditSpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  const spotChange = useSelector((state) => state.spots[spotId]);

  const [address, setAddress] = useState();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [price, setPrice] = useState(0);
  const [state, setState] = useState("");
  const [errors, setErrors] = useState([]);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (spotChange) {
      setAddress(spotChange.address);
      setCity(spotChange.city);
      setCountry(spotChange.country);
      setDescription(spotChange.description);
      setLat(spotChange.lat);
      setLng(spotChange.lng);
      setName(spotChange.name);
      setPreviewImage(spotChange.previewImage);
      setPrice(spotChange.price);
      setState(spotChange.state);
    }
  }, [spotChange]);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePreviewImage = (e) => setPreviewImage(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateState = (e) => setState(e.target.value);

  useEffect(() => {
    dispatch(allSpotsThunk());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: spotId,
      address,
      city,
      country,
      description,
      lat,
      lng,
      name,
      previewImage,
      price,
      state,
    };

    let editedSpot = await dispatch(editSpotThunk(payload)).catch(
      async (response) => {
        const data = await response.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if (editedSpot) {
      history.push(`/spots/${editedSpot.id}`);
    }
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return sessionUser.id ? (
    <section>
      <form className="edit-spot-form" onSubmit={handleSubmit}>
        <div className="edit-spot-errors">
          {errors.map((error, index) => (
            <li key={index}>Error: {error}</li>
          ))}
        </div>
        <p className="spot-form-title">Edit this Spot:</p>
        <input
          className="input"
          type="text"
          placeholder="Spot name here"
          value={name}
          onChange={updateName}
        />

        <input
          className="input"
          type="text"
          placeholder="Address here"
          value={address}
          onChange={updateAddress}
        />

        <input
          className="input"
          type="text"
          placeholder="City here"
          value={city}
          onChange={updateCity}
        />

        <input
          className="input"
          type="text"
          placeholder="State here"
          value={state}
          onChange={updateState}
        />

        <input
          className="input"
          type="text"
          placeholder="Country here"
          value={country}
          onChange={updateCountry}
        />

        <input
          className="input"
          type="text"
          placeholder="Description here"
          value={description}
          onChange={updateDescription}
        />

        <input
          className="input"
          type="number"
          min="0"
          placeholder="Latitude here"
          value={lat || ""}
          onChange={updateLat}
        />

        <input
          className="input"
          type="number"
          min="0"
          placeholder="Longitude here"
          value={lng || ""}
          onChange={updateLng}
        />

        <input
          className="input"
          type="text"
          placeholder="Image url here"
          value={previewImage}
          onChange={updatePreviewImage}
        />

        <input
          className="input"
          type="number"
          min="1"
          placeholder="Price here"
          value={price || ""}
          onChange={updatePrice}
        />

        <div className="edit-submit-button-div">
          <button className="edit-submit-button" type="submit">
            Edit Spot
          </button>
        </div>
      </form>

      <div className="page-bottom-text">Made by + Technologies:</div>
      <div className="page-bottom-buttons">
        <a href="https://github.com/alexandratai" target="_blank">
          <div className="github-div">
            <button className="github">
              <i className="fa-brands fa-github"></i>
            </button>
          </div>
        </a>
        <div className="tech-div">
          <button className="tech" onClick={openMenu}>
            <i className="fa-solid fa-code"></i>
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="tech-dropdown">
          Built with Node.js, Express, Sequelize, Sqlite3, <br></br>React,
          Redux, HTML5, CSS, Git, JavaScript
        </div>
      )}
    </section>
  ) : null;
};

export default EditSpotForm;
