import React, { PropsWithChildren } from "react";
import { NavigateFunction } from "react-router";
import withNavigate, { WithNavigateProps } from "helpers/withNavigate";

type Props = WithNavigateProps<PropsWithChildren<{
  onClick: (navigate: NavigateFunction) => void;
}>>;

class ButtonComponent extends React.Component<Props> {
  public render(): React.ReactNode {
    const { children, onClick, navigate } = this.props;
    return (
      <button onClick={() => onClick(navigate)}>
        <style jsx>{`
          button {
            background: none;
            border: 1px solid var(--cl-light-bg);
            width: auto;
            text-align: inherit;
            display: inline-block;
            box-sizing: border-box;
            font-size: 16px;
            line-height: 20px;
            padding: 5px;
          }

          button:hover {
            cursor: pointer;
            background-color: var(--cl-light-bg);
          }
        `}</style>
        {children}
      </button>
    );
  }
}

export const Button = withNavigate(ButtonComponent);
