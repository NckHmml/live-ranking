import Container from "typedi";
import "reflect-metadata";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./index.css";
import routes from "./routes";
import { RANKING_SERVICE } from "./services/RankingService";
import { BrowserRankingService } from "./services/impl/BrowserRankingService";

/** TypeDI */
Container.set(RANKING_SERVICE, new BrowserRankingService());

const router = createBrowserRouter(routes);

const children = (
  <React.StrictMode>
    <Helmet titleTemplate="LiveRanking - %s">
      <meta name="description" content="Live Ranking, by Nick Hummel" />
    </Helmet>
    <RouterProvider router={router} />
  </React.StrictMode>
);

if (process.env.NODE_ENV === "development") {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(children);
} else {
  ReactDOM.hydrateRoot(
    document.getElementById("root") as HTMLElement,
    children
  );
}
