import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { getVideoSource } from "../actions";

import "../assets/styles/Player.scss";

const Player = (props) => {
  const { id } = props.match.params;
  const hasPlaying = Object.keys(props.playing).length;

  useEffect(() => {
    props.getVideoSource(id);
  }, []);

  return hasPlaying ? (
    <div className="player">
      <video controls autoPlay>
        <source src={props.playing.source} type="video/mp4" />
      </video>
      <div className="player-back">
        <button type="button" onClick={() => props.history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <h1>Cargando...</h1>
  );
};
const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};
const mapDispatchToProps = {
  getVideoSource,
};
export default connect(mapStateToProps, mapDispatchToProps)(Player);

//(
//    <Redirect to="/404/" />
//  )
