import React, { useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions";
import { Link } from "react-router-dom";
import "../assets/styles/Register.scss";

const Register = (props) => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.registerUser(form, "/login");
    //props.history.push("/");
  };
  return (
    <section className="register">
      <section className="register__container">
        <h2>Regístrate</h2>
        <form className="register__container--form" onSubmit={handleSubmit}>
          <input
            className="input-register"
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={handleInput}
          />
          <input
            className="input-register"
            type="text"
            placeholder="Correo"
            name="email"
            onChange={handleInput}
          />
          <input
            className="input-register"
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={handleInput}
          />
          <button className="button" type="submit">
            Registrarme
          </button>
        </form>
        <Link to="/login">Iniciar sesión</Link>
      </section>
    </section>
  );
};

const mapDispatchToProps = {
  registerUser,
};
export default connect(null, mapDispatchToProps)(Register);
