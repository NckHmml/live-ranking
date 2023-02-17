/// <reference types="react-scripts" />

import "typedi";

declare module "typedi" {
  declare class Container {
    public static get<T>(type: T): T.prototype; // To handle abstract classes
  }
}
