import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { setFavorite, deleteFavortite } from "../actions";
import { connect } from "react-redux";

import plusIcon from "../assets/images/plus-icon.png";
import playIcon from "../assets/images/play-icon.png";
import removeIcon from "../assets/images/remove-icon.png";

import "../assets/styles/components/CarouselItem.scss";

const CarouselItem = (props) => {
  const { id, cover, title, year, contentRating, duration } = props.data;
  const handleSetFavorite = () => {
    props.setFavorite({
      id,
      cover,
      title,
      year,
      contentRating,
      duration,
    });
  };
  const handleDeleteFavorite = (itemId) => {
    props.deleteFavortite(itemId);
  };
  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <img
            className="carousel-item__details--img"
            src={playIcon}
            alt="Play Icon"
            onClick={() => {
              props.history.push(`/player/${id}`);
            }}
          />
          {props.isList ? (
            <img
              className="carousel-item__details--img"
              src={removeIcon}
              alt="Remove Icon"
              onClick={() => handleDeleteFavorite(id)}
            />
          ) : (
            <img
              className="carousel-item__details--img"
              src={plusIcon}
              alt="Plus Icon"
              onClick={handleSetFavorite}
            />
          )}
        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">
          {`${year}  ${contentRating}   ${duration}min`}
        </p>
      </div>
    </div>
  );
};

//propTypes, definen el tipo de dato de los props
CarouselItem.propTypes = {
  data: PropTypes.object,
};

const mapDispatchToProps = {
  setFavorite,
  deleteFavortite,
};

export default withRouter(connect(null, mapDispatchToProps)(CarouselItem));
