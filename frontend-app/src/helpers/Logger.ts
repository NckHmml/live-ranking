/* eslint-disable no-console */
import { Service } from "typedi";

@Service()
export class Logger {
  public log(message: string) {
    if (process.env.NODE_ENV === "production") return;
    console.log(message);
  }
  public info(message: string) {
    if (process.env.NODE_ENV === "production") return;
    console.info(message);
  }
  public warn(message: string) {
    if (process.env.NODE_ENV === "production") return;
    console.warn(message);
  }
  public error(message: string) {
    console.error(message);
  }
}
