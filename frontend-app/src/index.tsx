import Container from "typedi";
import "reflect-metadata";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Helmet } from "react-helmet";

import "index.css";
import routes from "routes";
import { RankingStore } from "redux/RankingStore";
import { RankingService } from "services/RankingService";
import { BrowserRankingService } from "services/impl/BrowserRankingService";
import { WebSocketService } from "services/WebSocketService";
import { BrowserWebSocketService } from "services/impl/BrowserWebSocketService";

/** TypeDI */
Container.set(RankingService, new BrowserRankingService());
Container.set(WebSocketService, new BrowserWebSocketService());

const hydrationData = window.__staticRouterHydrationData;

if (Boolean(hydrationData)) {
  // Hydrate the ranking
  const rankingStore = Container.get(RankingStore);
  rankingStore.hydrate(hydrationData!);
}


const router = createBrowserRouter(routes, { hydrationData });

const children = (
  <React.StrictMode>
    <Helmet titleTemplate="LiveRanking - %s">
      <meta name="description" content="Live Ranking, by Nick Hummel" />
    </Helmet>
    <RouterProvider router={router} />
  </React.StrictMode>
);

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  children
);
