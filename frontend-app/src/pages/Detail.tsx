import React from "react";
import Container from "typedi";
import { observer } from "mobx-react";

import withLoaderData, { WithLoaderDataProps } from "helpers/withLoaderData";
import { Logger } from "helpers/Logger";
import { RankingStore } from "redux/RankingStore";


type Props = WithLoaderDataProps<{}, string>;

@observer
class Detail extends React.Component<Props> {
  private get logger(): Logger {
    return Container.get(Logger);
  }

  private get rankingStore(): RankingStore {
    return Container.get(RankingStore);
  }

  public componentDidMount() {
    this.logger.info("Current page: Detail");
  }

  public render(): React.ReactNode {
    const character = this.rankingStore.getCharacter(this.props.loaderData)!;

    return (
      <div>
        <style jsx>{`
          table {
            margin: 0 auto;
            table-layout: fixed;
            border-collapse: collapse;
          }

          td {
            border-bottom: 1px solid var(--cl-light-bg);
            text-align: left;
          }

          td:last-child {
            padding-left: 5px;
          }
        `}</style>
        <h1>Detail</h1>
        <h2>{character.name}</h2>
        <table>
          <tr>
            <td>Identifier:</td>
            <td>{character.id}</td>
          </tr>
          <tr>
            <td>Experience:</td>
            <td>{character.experience}</td>
          </tr>
          <tr>
            <td>Level:</td>
            <td>{character.level}</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default withLoaderData(Detail);
