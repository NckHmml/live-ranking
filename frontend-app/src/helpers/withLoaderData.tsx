/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { useLoaderData } from "react-router-dom";

/**
 * Component wrapper to deal with react-router being function
 * @summary We need the useLoaderData to be able to deal with the server-side rendering of data and the hydration of it, while still being able to use OOP React
 */
export default function withLoaderData(Component: any) {
  return function WithLoaderData(props: any) {
    const loaderData = useLoaderData();
    return <Component {...props} loaderData={loaderData} />;
  };
}
