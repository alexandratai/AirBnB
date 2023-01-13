import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser.id) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      // .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
  }

  return (
    <form className="modal" onSubmit={handleSubmit}>
      <div className="error-text">
        {errors.map((error, idx) => <li key={idx}>Error: {error}</li>)}
      </div>
      <label className="modal-text">
        <p>Username or Email</p>
        <div>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        </div>
      </label>
      <label className="modal-text">
        <p>Password</p>
        <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
      </label><br></br>
      <div className="modal-button-div">
      <button className="modal-button" type="submit">Log In</button>
      </div>
    </form>
  );
}

export default LoginForm;