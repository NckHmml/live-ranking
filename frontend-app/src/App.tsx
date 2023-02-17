import "./App.css";
import logo from "./logo.svg";
import React from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";

export default class App extends React.PureComponent {

  public render(): React.ReactNode {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Link className="App-link" to="/">Home</Link>
            <Link className="App-link" to="/ranking">Ranking</Link>
          </header>
          <Outlet />
        </div>
      </>
    );
  }
}
