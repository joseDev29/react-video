import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { logoutRequest } from "../actions";
import gravatar from "../utils/gravatar";

import platziIcon from "../assets/images/logo-platzi-video-BW2.png";

import "../assets/styles/components/Header.scss";

const Header = (props) => {
  const { user } = props;
  const handleLogout = () => {
    document.cookie = "email=";
    document.cookie = "name=";
    document.cookie = "id=";
    document.cookie = "token=";
    props.logoutRequest({});
    window.location.href = "/login";
  };
  const headerColor =
    useLocation().pathname === "/register" ||
    useLocation().pathname === "/login"
      ? "greenHeader"
      : " ";
  return (
    <header className={`header ${headerColor}`}>
      <Link to="/">
        <img className="header__img" src={platziIcon} alt="Platzi Video" />
      </Link>
      <div className="header__menu">
        {Object.keys(user).length ? (
          <>
            <div className="header__menu--profile">
              <img
                src={gravatar(user.email)}
                alt={user.email}
                className="user-img"
              />
              <p>Perfil</p>
            </div>
            <ul>
              <li>
                <Link to="/">{user.name || "Username"}</Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </>
        ) : (
          <Link to="/login" className="header__login-link">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
