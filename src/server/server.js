import express from "express";
import dotenv from "dotenv";
import webpack from "webpack";
import helmet from "helmet";

import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import Layout from "../frontend/components/Layout";
import serverRoutes from "../frontend/routes/serverRoutes";
import reducer from "../frontend/reducers";
//import initialState from "../frontend/initialState";
import getManifest from "./getManifest";

import cookieParser from "cookie-parser";
import boom from "@hapi/boom";
import passport from "passport";
import axios from "axios";

dotenv.config();

const { ENV, PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Basic Strategy
require("./utils/auth/strategies/basic");

if (ENV === "development") {
  console.log("Dev config");
  const webpackConfig = require("../../webpack.config");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const compiler = webpack(webpackConfig);

  const { publicPath } = webpackConfig.output;
  const serverConfig = { serverSideRender: true, publicPath };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "default-src": ["'self'"],
        "script-src": [
          "'self'",
          "'sha256-ugqBEZcmC+J57++MBGuOE65K9zugp4RxMaP8+98WI2g='",
        ],
        "img-src": ["'self'", "http://dummyimage.com"],
        "style-src-elem": ["'self'", "https://fonts.googleapis.com"],
        "font-src": ["https://fonts.gstatic.com"],
        "media-src": ["*"],
      },
    })
  );
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable("x-powered-by");
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest["vendors.css"] : "assets/app.css";
  const mainBuild = manifest ? manifest["main.js"] : "assets/app.js";
  const vendorBuild = manifest ? manifest["vendors.js"] : "assets/vendor.js";

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="${mainStyles}" type="text/css">
      <title>React Video</title>
    </head>
    <body>
      <div id="root">
        ${html}
      </div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/recipes/server-rendering/#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          "\\u003c"
        )}
      </script>
      <script src="${mainBuild}" type="text/javascript"></script>
      <script src="${vendorBuild}" type="text/javascript"></script>
    </body>
  </html>
  `;
};

const renderApp = async (req, res) => {
  let initialState;
  const { token, email, name, id } = req.cookies;

  try {
    let movieList = await axios({
      url: `${process.env.API_URL}/api/movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: "get",
    });

    movieList = movieList.data.data;

    initialState = {
      user: {
        id,
        email,
        name,
      },
      mylist: [],
      trends: movieList.filter(
        (movie) => movie.contentRating === "PG" && movie._id
      ),
      originals: movieList.filter(
        (movie) => movie.contentRating === "G" && movie._id
      ),
    };
  } catch (err) {
    initialState = {
      user: {},
      mylist: [],
      trends: [],
      originals: [],
    };
  }

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const isLogged = initialState.user.id;
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
      </StaticRouter>
    </Provider>
  );

  res.send(setResponse(html, preloadedState, req.hashManifest));
};

//Se capturan todas las request type get
app.get("*", renderApp);
app.post("/auth/sign-in", async function (req, res, next) {
  passport.authenticate("basic", function (error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      req.login(data, { session: false }, async function (err) {
        if (err) {
          next(err);
        }

        const { token, ...user } = data;

        res.cookie("token", token, {
          httpOnly: !(ENV === "development"),
          secure: !(ENV === "development"),
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function (req, res, next) {
  const { body: user } = req;

  try {
    const userData = await axios({
      url: `${process.env.API_URL}/api/auth/sign-up`,
      method: "post",
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    res.status(201).json({
      name: req.body.name,
      email: req.body.email,
      id: userData.data.id,
    });
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, (err) => {
  err
    ? console.error("New Error: ", err)
    : console.log(`Server running on : http://localhost:${PORT}`);
});
