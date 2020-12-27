//Payload es el objeto que contiene la info

export const setFavorite = (payload) => {
  console.log("Go setFavorite: ", payload);
  return { type: "SET_FAVORITE", payload };
};

export const deleteFavortite = (payload) => ({
  type: "DELETE_FAVORITE",
  payload,
});

export const loginRequest = (payload) => ({
  type: "LOGIN_REQUEST",
  payload,
});

export const logoutRequest = (payload) => ({
  type: "LOGOUT_REQUEST",
  payload,
});

export const registerRequest = (payload) => ({
  type: "REGISTER_REQUEST",
  payload,
});

export const getVideoSource = (payload) => ({
  type: "GET_VIDEO_SOURCE",
  payload,
});
