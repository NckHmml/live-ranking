import React from "react";
import Container from "typedi";
import { Logger } from "helpers/Logger";

export default class Detail extends React.Component {
  private get logger(): Logger {
    return Container.get(Logger);
  }

  public componentDidMount() {
    this.logger.info("Current page: Detail");
  }

  public render(): React.ReactNode {
    return (
      <div>
        <h1>Detail</h1>
      </div>
    );
  }
}
