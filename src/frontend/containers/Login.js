import React, { useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { loginUser } from "../actions";

import googleIcon from "../assets/images/google-icon.png";
import twitterIcon from "../assets/images/twitter-icon.png";

import "../assets/styles/Login.scss";

const Login = (props) => {
  const [form, setForm] = useState({
    email: "",
  });

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginUser(form, "/");
    //props.history.push("/");
  };

  return (
    <section className="login">
      <section className="login__container">
        <h2>Inicia sesión</h2>
        <form className="login__container--form" onSubmit={handleSubmit}>
          <input
            className="input-login"
            type="text"
            name="email"
            placeholder="Correo"
            onChange={handleInput}
          />
          <input
            className="input-login"
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleInput}
          />
          <button className="button" type="submit">
            Iniciar sesión
          </button>
          <div className="login__container--remember-me">
            <label>
              <input type="checkbox" id="cbox1" value="first_checkbox" />
              Recuérdame
            </label>
            <a href="/">Olvidé mi contraseña</a>
          </div>
        </form>
        <section className="login__container--social-media">
          <div>
            <img src={googleIcon} /> Inicia sesión con Google
          </div>
          <div>
            <img src={twitterIcon} /> Inicia sesión con Twitter
          </div>
        </section>
        <p className="login__container--register">
          No tienes ninguna cuenta <Link to="/register">Regístrate</Link>
        </p>
      </section>
    </section>
  );
};

const mapsDispatchToProps = {
  loginUser,
};

export default connect(null, mapsDispatchToProps)(Login);
