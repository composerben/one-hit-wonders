import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import "./navbar.css";

const NavBar = () => {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/" exact={true}>
          <img
            alt="Site Logo"
            src="https://one-hit-wonders.s3.us-west-2.amazonaws.com/Screen+Shot+2021-07-01+at+1.52.58+PM.png"
          ></img>
        </NavLink>
      </div>
      <div className="navbar__element">
        <NavLink to="/kits" exact={true}>
          all the stuff
        </NavLink>
      </div>
      {!currentUser && (
        <>
          <div className="navbar__element">
            <NavLink to="/login" exact={true}>
              login
            </NavLink>
          </div>
          <div className="navbar__element">
            <NavLink to="/sign-up" exact={true}>
              sign up
            </NavLink>
          </div>
        </>
      )}
      {currentUser && (
        <>
          <div className="navbar__element">
            <NavLink className="hit-stuff" to="/hit-stuff" exact={true}>
              <p>HIT STUFF</p>
            </NavLink>
          </div>
          <div className="navbar__element">
            <NavLink to="/new-kit" exact={true}>
              add stuff to hit
            </NavLink>
          </div>
          <div className="navbar__element">
            <LogoutButton />
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
