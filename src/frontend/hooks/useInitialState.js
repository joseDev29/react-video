import { useState, useEffect } from "react";

const useInitialState = (urlAPI, useEffectParams) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(urlAPI)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, useEffectParams);

  return [data, setData];
};

export default useInitialState;
