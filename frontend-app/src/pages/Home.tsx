import React from "react";
import Container from "typedi";
import { Logger } from "helpers/Logger";

export default class Home extends React.PureComponent {
  private get logger(): Logger {
    return Container.get(Logger);
  }

  public componentDidMount() {
    this.logger.info("Current page: Home");
  }

  public render(): React.ReactNode {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}
