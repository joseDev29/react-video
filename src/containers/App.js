import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Category from "../components/Category";
import Carousel from "../components/Carousel";
import CarouselItem from "../components/CarouselItem";

import useInitialState from "../hooks/useInitialState";

import "../assets/styles/App.scss";
import Footer from "../components/Footer";

const App = () => {
  const [videos, setVideos] = useInitialState(
    "http://localhost:3000/initialState",
    []
  );

  return (
    <>
      <Header />
      <Search />

      {!Object.keys(videos).length && <h1>Cargando...</h1>}

      {videos.mylist && videos.mylist.length ? (
        <Category>
          <Carousel>
            {videos.mylist.map((video) => (
              <CarouselItem key={video.id} data={video} />
            ))}
          </Carousel>
        </Category>
      ) : null}

      {videos.trends && videos.trends.length && (
        <Category title="Tendencias">
          <Carousel>
            {videos.trends.map((video) => (
              <CarouselItem key={video.id} data={video} />
            ))}
          </Carousel>
        </Category>
      )}

      {videos.originals && videos.originals.length && (
        <Category title="Originales ReactVideo">
          <Carousel>
            {videos.originals.map((video) => (
              <CarouselItem key={video.id} data={video} />
            ))}
          </Carousel>
        </Category>
      )}

      <Footer />
    </>
  );
};

export default App;
