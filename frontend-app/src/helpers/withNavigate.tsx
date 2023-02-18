/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

/**
 * Component wrapper to deal with react-router being functional
 */
export default function withNavigate<T>(Component: typeof React.Component<WithNavigateProps<T>>) {
  return function withNavigate(props: T) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export type WithNavigateProps<T> = T & {
  navigate: NavigateFunction;
};
