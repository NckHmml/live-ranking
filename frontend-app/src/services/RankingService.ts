import { Token } from "typedi";
import { ICharacterViewModel } from "../models/Character";

export interface IRankingService {
  getAll(): Promise<Array<ICharacterViewModel>>;
  clearAll(): Promise<void>;
}

export const RANKING_SERVICE = new Token("IRankingService");
