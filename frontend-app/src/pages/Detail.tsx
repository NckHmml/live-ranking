import React from "react";
import Container from "typedi";

import withLoaderData, { WithLoaderDataProps } from "helpers/withLoaderData";
import { Logger } from "helpers/Logger";
import { ICharacterViewModel } from "models/Character";


type Props = WithLoaderDataProps<{}, ICharacterViewModel>;

class Detail extends React.Component<Props> {
  private get logger(): Logger {
    return Container.get(Logger);
  }

  public componentDidMount() {
    this.logger.info("Current page: Detail");
  }

  public render(): React.ReactNode {
    const { loaderData: character } = this.props;
    return (
      <div>
        <h1>Detail</h1>
        <h2>{character.name}</h2>
      </div>
    );
  }
}

export default withLoaderData(Detail);
