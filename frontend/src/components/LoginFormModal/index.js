import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const credential = "Demo-lition";
  const password = "password";

  const handleClick = async (e) => {
    e.preventDefault();

    const payload = {
      credential,
      password,
    };

    let demoUser = await dispatch(sessionActions.login(payload));

    if (demoUser) {
      history.push(`/`);
    }
  };

  return (
    <>
      <div className="modal-button-div">
        <button className="modal-button" onClick={() => setShowModal(true)}>
          Log In
        </button>
      </div>
      <div className="modal-button-div">
        <button className="modal-button" onClick={handleClick}>
          Demo
        </button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
