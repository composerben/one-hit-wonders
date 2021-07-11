import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp, login } from "../../store/session";
import "./signup-form.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form className="signup-form" onSubmit={onSignUp}>
      <div className="signup-form__element">
        <label>username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="signup-form__element">
        <label>email</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="signup-form__element">
        <label>password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="signup-form__element">
        <label>repeat password</label>
        <input
          type="password"
          name="repeat_password"
          placeholder="repeat password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className="signup-buttons">
        <button type="submit">SIGN UP</button>
        <button className="demo-button" onClick={demoLogin}>
          DEMO USER
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
