import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./logout-button.css"

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    history.push("/");
    await dispatch(logout());
  };

  return (
    <button className="logout-button" onClick={onLogout}>
      logout
    </button>
  );
};

export default LogoutButton;
