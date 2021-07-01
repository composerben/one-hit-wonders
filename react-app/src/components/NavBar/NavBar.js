import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__element">
        <NavLink to="/" exact={true}>
          <img
            alt="Site Logo"
            src="https://one-hit-wonders.s3.us-west-2.amazonaws.com/Screen+Shot+2021-07-01+at+1.52.58+PM.png"
          ></img>
        </NavLink>
      </div>
      <div className="navbar__element">
        <NavLink to="/login" exact={true}>
          Login
        </NavLink>
      </div>
      <div className="navbar__element">
        <NavLink to="/sign-up" exact={true}>
          Sign Up
        </NavLink>
      </div>
      <div className="navbar__element">
        <NavLink to="/users" exact={true}>
          Users
        </NavLink>
      </div>
      <div className="navbar__element">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default NavBar;
