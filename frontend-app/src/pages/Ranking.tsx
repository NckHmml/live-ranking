import React from "react";
import { observer } from "mobx-react";
import Container from "typedi";
import { RankingStore } from "redux/RankingStore";
import withLoaderData, { WithLoaderDataProps } from "helpers/withLoaderData";
import { Logger } from "helpers/Logger";
import { RankEntry } from "components/RankEntry";

type Props = WithLoaderDataProps<{}, RankingStore["characters"]>;

@observer
class Ranking extends React.Component<Props> {
  private get logger(): Logger {
    return Container.get(Logger);
  }

  public componentDidMount() {
    this.logger.info("Current page: Ranking");
  }

  public render(): React.ReactNode {
    const rankings = this.props.loaderData!
      .slice(0, 5)
      .sort((a, b) => (a.experience > b.experience ? -1 : 1))
      .map((c, i) => (
        <RankEntry key={c.id} index={i + 1} character={c} />
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
