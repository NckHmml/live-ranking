import React from "react";
import { observer } from "mobx-react";
import Container from "typedi";
import { RankingStore } from "redux/RankingStore";

import withLoaderData, { WithLoaderDataProps } from "helpers/withLoaderData";
import { Logger } from "helpers/Logger";
import { RankEntry } from "components/RankEntry";
import { Button } from "components/Button";

type Props = WithLoaderDataProps<{}, RankingStore["characters"]>;

@observer
class Ranking extends React.Component<Props> {
  private get logger(): Logger {
    return Container.get(Logger);
  }

  private get rankingStore(): RankingStore {
    return Container.get(RankingStore);
  }

  public onClear = () => {
    this.logger.info("Clearing the current ranking");
    this.rankingStore.clearAll();
  };

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
        <style jsx>{`
          div > :global(button) {
            margin-top: 10px;
          }
        `}</style>
        <h1>Ranking</h1>
        {rankings}
        <Button onClick={this.onClear}>Clear all</Button>
      </div>
    );
  }
}

export default withLoaderData(Ranking);
