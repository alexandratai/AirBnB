import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const credential = "Demo-lition";
  const password = "password";
  const [errors, setErrors] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();

    const payload = {
      credential,
      password
    };

    let demoUser = await dispatch(sessionActions.login(payload))
    .catch(async (response) => {
      const data = await response.json();
      return setErrors([data.message])
    });

    if (demoUser) {
      history.push(`/`)
    }
  };


  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      <button onClick={handleClick}>Demo</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
