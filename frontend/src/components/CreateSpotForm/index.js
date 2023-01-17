import "./CreateSpotForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { allSpotsThunk } from "../../store/spots";
import { makeSpotThunk } from "../../store/spots";

const CreateSpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [address, setAddress] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
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

    let createdSpot = await dispatch(makeSpotThunk(payload)).catch(
      async (response) => {
        const data = await response.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`);
    }
  };

  return sessionUser.id ? (
    <section>
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <div className="errors">
          {errors.map((error, index) => (
            <li key={index}>Error: {error}</li>
          ))}
        </div>
        <p className="spot-form">Create a Spot:</p>

        <input 
          type="text"
          placeholder="Spot name here"
          value={name}
          onChange={updateName}
        />

        <input 
          type="text"
          placeholder="Address here"
          value={address}
          onChange={updateAddress}
        />

        <input 
          type="text"
          placeholder="City here"
          value={city}
          onChange={updateCity}
        />

        <input 
          type="text"
          placeholder="State here"
          value={state}
          onChange={updateState}
        />

        <input 
          type="text"
          placeholder="Country here"
          value={country}
          onChange={updateCountry}
        />

        <input 
          type="text"
          placeholder="Description here"
          value={description}
          onChange={updateDescription}
        />

        <input 
          type="number"
          min="0"
          placeholder="Latitude here"
          value={lat || ""}
          onChange={updateLat}
        />

        <input 
          type="number"
          min="0"
          placeholder="Longitude here"
          value={lng || ""}
          onChange={updateLng}
        />

        <input 
          type="text"
          placeholder="Image url here"
          value={previewImage}
          onChange={updatePreviewImage}
        />
        
        <input 
          type="number"
          min="1"
          placeholder="Price here"
          value={price || ""}
          onChange={updatePrice}
        />
        <div className="submit-button-div">
          <button className="submit-button" type="submit-button">Create New Spot</button>
        </div>
      </form>

      <div className="page-bottom-text">Made by + Technologies:</div>
      <div className="page-bottom-buttons">
        <a href="https://github.com/alexandratai" target="_blank" rel="noreferrer">
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

export default CreateSpotForm;
