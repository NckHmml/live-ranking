/* eslint-disable import/first */
import "reflect-metadata";

import { config as dotenv } from "dotenv";
dotenv();

import express from "express";
import Container from "typedi";
import * as path from "path";
import * as fs from "fs";
import * as React from "react";
import * as Handlebars from "handlebars";
import { renderToString } from "react-dom/server";
import { createStaticRouter, StaticRouterProvider } from "react-router-dom/server";
import { createStaticHandler } from "@remix-run/router";
import { Helmet } from "react-helmet";
import { enableStaticRendering } from "mobx-react";

/** Custom import logic, needs to be before local imports */
require.extensions[".css"] = (_module, _file) => null;
require.extensions[".svg"] = (module, file) => {
  const content = Buffer.from(fs.readFileSync(file, "utf8")).toString("base64");
  // eslint-disable-next-line no-param-reassign
  module.exports = "data:image/svg+xml;base64," + content;
};

import Routes from "./routes";
import { RANKING_SERVICE } from "./services/RankingService";
import { ServerRankingService } from "./services/impl/ServerRankingService";

/** TypeDI */
Container.set(RANKING_SERVICE, new ServerRankingService());

/** MobX */
enableStaticRendering(true);

/**
 * Creates the request headers needed for the static routing
 */
function createFetchHeaders(
  requestHeaders: express.Request["headers"]
): Headers {
  const headers = new Headers();

  for (const [key, values] of Object.entries(requestHeaders)) {
    if (Boolean(values)) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values!);
      }
    }
  }

  return headers;
}

/**
 * Creates a request wrapper needed for the static routing
 */
function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl ?? req.url, origin);

  const controller = new AbortController();

  req.on("close", () => {
    controller.abort();
  });

  const init: RequestInit = {
    method: req.method,
    headers: createFetchHeaders(req.headers),
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}

const server = express();
const indexPath = path.resolve(__dirname, "../build/index.html");
const indexHtml = fs.existsSync(indexPath) ?
  fs.readFileSync(indexPath) :
  "";
const indexTemplate = Handlebars.compile(indexHtml.toString());

const renderReact: express.RequestHandler = async (req: express.Request, res: express.Response) => {
  const { query } = createStaticHandler(Routes);
  const remixRequest = createFetchRequest(req);
  const context = await query(remixRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(Routes, context);
  const reactDom = renderToString(
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
      />
    </React.StrictMode>
  );

  const helmet = Helmet.renderStatic();
  const body = indexTemplate({
    reactDom,
    helmet,
  });

  console.log("renderReact", body);

  res.writeHead(context.statusCode, { "Content-Type": "text/html" });
  res.end(body);
};

server.get("/", renderReact);
server.get("/index.html", (_req, res) => res.redirect("/"));
server.use(express.static(path.resolve(__dirname, "../build")));
server.get("/*", renderReact);

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
