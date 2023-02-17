import React from "react";
import { RouteObject } from "react-router-dom";
import Container from "typedi";

import App from "./App";
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import { RankingStore } from "./redux/RankingStore";

const routes: Array<RouteObject> = [{
  path: "/",
  element: <App />,
  children: [{
    path: "/",
    element: <Home />,
  }, {
    id: "ranking",
    path: "ranking",
    element: <Ranking />,
    loader: async () => {
      const rankingStore = Container.get(RankingStore);
      await rankingStore.loading;
      return rankingStore.characters;
    }
  }]
}];

export default routes;
