import React from "react";

import "../assets/styles/components/Category.scss";

const Category = (props) => (
  <>
    <h3 className="categories__title">{props.title}</h3>
    {props.children}
  </>
);

export default Category;
