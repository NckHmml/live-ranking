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
        <div>
          <style jsx>{`
            div {
              text-align: center;
            }

            header {
              align-items: center;
              background-color: #282c34;
              display: flex;
              font-size: 30px;
              font-weight: bold;
              color: white;
            }

            img {
              height: 20vmin;
              pointer-events: none;
            }

            @media (prefers-reduced-motion: no-preference) {
              img {
                animation: App-logo-spin infinite 20s linear;
              }
            }

            @keyframes App-logo-spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            div :global(a) {
              margin-right: 10px;
              color: var(--cl-link);
            }
          `}</style>
          <header>
            <img src="./logo.svg" alt="logo" />
            <Link to="/">Homes</Link>
            <Link to="/ranking">Ranking</Link>
          </header>
          <Outlet />
        </div>
      </>
    );
  }
}
