/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { useLoaderData } from "react-router-dom";

/**
 * Component wrapper to deal with react-router being functional
 * @summary We need the useLoaderData to be able to deal with the server-side rendering of data and the hydration of it, while still being able to use OOP React
 */
export default function withLoaderData<T>(Component: typeof React.Component<WithLoaderDataProps<Partial<T>, unknown>>) {
  return function WithLoaderData(props: Partial<T>) {
    const loaderData = useLoaderData();
    return <Component {...props} loaderData={loaderData} />;
  };
}
export type WithLoaderDataProps<T1, T2> = T1 & {
  loaderData: T2;
};
