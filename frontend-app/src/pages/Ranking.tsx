import React from "react";
import { observer } from "mobx-react";
import Container from "typedi";
import { RankingStore } from "redux/RankingStore";
import withLoaderData from "helpers/withLoaderData";
import { Logger } from "helpers/Logger";


interface IProps {
  loaderData: RankingStore["characters"];
}

@observer
class Ranking extends React.Component<IProps> {
  private get logger(): Logger {
    return Container.get(Logger);
  }

  public componentDidMount() {
    this.logger.info("Current page: Ranking");
  }

  public render(): React.ReactNode {
    const rankings = this.props.loaderData
      .slice(0, 5)
      .sort((a, b) => (a.experience > b.experience ? -1 : 1))
      .map((c, i) => (
        <div key={c.id}>#{i+1} {c.name} - {c.experience}</div>
      ));
    return (
      <div>
        <h1>Ranking</h1>
        {rankings}
      </div>
    );
  }
}

export default withLoaderData(Ranking);
