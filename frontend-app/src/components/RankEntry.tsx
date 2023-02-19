import React from "react";
import withNavigate, { WithNavigateProps } from "helpers/withNavigate";
import { ICharacterViewModel } from "models/Character";

type Props = {
  index: number;
  character: ICharacterViewModel;
};

class RankEntryComponent extends React.Component<WithNavigateProps<Props>> {
  public onClick = () => {
    const { navigate, character } = this.props;
    navigate(`/character/${character.id}`);
  };

  public getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "--cl-rank-one";
      case 2:
        return "--cl-rank-two";
      case 3:
        return "--cl-rank-three";
      default:
        return "--cl-rank-other";
    }
  };

  public render(): React.ReactNode {
    const { index, character } = this.props;
    return (
      <div onClick={this.onClick}>
        <style jsx>{`
          div {
            display: flex;
            width: 300px;
            line-height: 30px;
            padding: 5px;
            gap: 0 3px;
            margin: 3px auto;
            border: 1px solid var(--cl-light-bg);
          }

          div:hover {
            cursor: pointer;
          }

          span.rank {
            background-color: var(${this.getRankColor(index)});
            border-radius: 15px;
            width: 30px;
          }

          span.name {
            flex: 1 0 auto;
          }

          small {
            width: 80px;
          }
        `}</style>
        <span className="rank">{index}</span>
        <span className="name">{character.name}</span>
        <small>{character.experience}</small>
      </div>
    );
  }
}

export const RankEntry = withNavigate(RankEntryComponent);
