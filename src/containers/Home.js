import React from "react";

import { connect } from "react-redux";

//Components
import Search from "../components/Search";
import Category from "../components/Category";
import Carousel from "../components/Carousel";
import CarouselItem from "../components/CarouselItem";

//Custom hooks
import useInitialState from "../hooks/useInitialState";

//Styles
import "../assets/styles/App.scss";

const Home = ({ mylist, trends, originals }) => {
  //const [videos] = useInitialState("http://localhost:3000/initialState", []);

  return (
    <>
      <Search />

      {mylist.length >= 0 ? (
        <Category>
          <Carousel>
            {mylist.map((video) => (
              //Al enviarse una prop sin valor, se toma como un boolean:true
              <CarouselItem key={video.id} data={video} isList />
            ))}
          </Carousel>
        </Category>
      ) : null}

      {trends.length && (
        <Category title="Tendencias">
          <Carousel>
            {trends.map((video) => (
              <CarouselItem key={video.id} data={video} />
            ))}
          </Carousel>
        </Category>
      )}

      {originals.length && (
        <Category title="Originales ReactVideo">
          <Carousel>
            {originals.map((video) => (
              <CarouselItem key={video.id} data={video} />
            ))}
          </Carousel>
        </Category>
      )}
    </>
  );
};

const mapStateToPros = (state) => {
  return {
    mylist: state.mylist,
    trends: state.trends,
    originals: state.originals,
  };
};

export default connect(mapStateToPros, null)(Home);
