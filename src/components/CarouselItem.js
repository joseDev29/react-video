import React from "react";
import PropTypes, { object } from "prop-types";

import plusIcon from "../assets/images/plus-icon.png";
import playIcon from "../assets/images/play-icon.png";
import "../assets/styles/components/CarouselItem.scss";

const CarouselItem = (props) => (
  <div className="carousel-item">
    <img
      className="carousel-item__img"
      src={props.data.cover}
      alt={props.data.title}
    />
    <div className="carousel-item__details">
      <div>
        <img
          className="carousel-item__details--img"
          src={playIcon}
          alt="Play Icon"
        />
        <img
          className="carousel-item__details--img"
          src={plusIcon}
          alt="Plus Icon"
        />
      </div>
      <p className="carousel-item__details--title">{props.data.title}</p>
      <p className="carousel-item__details--subtitle">
        {`${props.data.year}  ${props.data.contentRating}   ${props.data.duration}min`}
      </p>
    </div>
  </div>
);

CarouselItem.propTypes = {
  data: PropTypes.object,
};

export default CarouselItem;
