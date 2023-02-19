import React from "react";
import { RouteObject } from "react-router-dom";
import Container from "typedi";

import { RankingStore } from "redux/RankingStore";
import App from "App";
import Home from "pages/Home";
import Ranking from "pages/Ranking";
import Detail from "pages/Detail";

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
      const rankingStore = Container.get<RankingStore>(RankingStore);
      await rankingStore.loading;
      return rankingStore.characters;
    }
  }, {
    id: "detail",
    path: "character/:id",
    element: <Detail />,
    loader: async ({ params }) => {
      const rankingStore = Container.get<RankingStore>(RankingStore);
      await rankingStore.loading;
      const character = rankingStore.getCharacter(params.id);
      if (!Boolean(character))
        throw new Response("Not found", { status: 404 });
      return character!.id;
    }
  }]
}];

export default routes;
