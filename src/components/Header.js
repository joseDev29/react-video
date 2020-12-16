import React from "react";

import userIcon from "../assets/images/user-icon.png";
import platziIcon from "../assets/images/logo-platzi-video-BW2.png";
import "../assets/styles/components/Header.scss";

const Header = () => (
  <header className="header">
    <img className="header__img" src={platziIcon} alt="Platzi Video" />
    <div className="header__menu">
      <div className="header__menu--profile">
        <img src={userIcon} />
        <p>Perfil</p>
      </div>
      <ul>
        <li>
          <a href="/">Cuenta</a>
        </li>
        <li>
          <a href="/">Cerrar Sesión</a>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
