import "./EditSpotForm.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { allSpotsThunk } from "../../store/spots";
import { editSpotThunk } from "../../store/spots";
import { useParams } from "react-router-dom";

const EditSpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  const spotChange = useSelector((state) => state.spots.id);

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
  }, [spotChange])

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

    let editedSpot = await dispatch(editSpotThunk(payload));
    if (editedSpot) {
      history.push(`/spots/${editedSpot.id}`);
    }
  };

  return sessionUser.id ? (
    <section>
      <form onSubmit={handleSubmit}>
        <label className="spot-form">Edit this Spot:</label>
        <br></br>
        <input
          required
          type="text"
          placeholder="Spot name here"
          value={name}
          onChange={updateName}
        />

        <input
          required
          type="text"
          placeholder="Address here"
          value={address}
          onChange={updateAddress}
        />

        <input
          required
          type="text"
          placeholder="City here"
          value={city}
          onChange={updateCity}
        />

        <input
          required
          type="text"
          placeholder="State here"
          value={state}
          onChange={updateState}
        />

        <input
          required
          type="text"
          placeholder="Country here"
          value={country}
          onChange={updateCountry}
        />

        <input
          required
          type="text"
          placeholder="Description here"
          value={description}
          onChange={updateDescription}
        />

        <input
          required
          type="number"
          min="0"
          placeholder="Latitude here"
          value={lat || ""}
          onChange={updateLat}
        />

        <input
          required
          type="number"
          min="0"
          placeholder="Longitude here"
          value={lng || ""}
          onChange={updateLng}
        />

        <input
          required
          type="text"
          placeholder="Image url here"
          value={previewImage}
          onChange={updatePreviewImage}
        />

        <input
          required
          type="number"
          min="1"
          placeholder="Price here"
          value={price || ""}
          onChange={updatePrice}
        />

        <button type="submit">Edit New Spot</button>
      </form>
    </section>
  ) :
  null;
};

export default EditSpotForm;