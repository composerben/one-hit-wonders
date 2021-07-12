import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import "./login-form.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}`} />;
  }

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={onLogin}>
        <div className="errors-container">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className="login-form__element">
          <label htmlFor="email">email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login-form__element">
          <label htmlFor="password">password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className="login-form__element">
          <div className="login-buttons">
            <button type="submit">LOGIN</button>
            <button className="demo-button" onClick={demoLogin}>DEMO USER</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
