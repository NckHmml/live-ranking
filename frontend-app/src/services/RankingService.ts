import { ICharacterViewModel } from "../models/Character";

export abstract class RankingService {
  public abstract getAll(): Promise<Array<ICharacterViewModel>>;
  public abstract clearAll(): Promise<void>;
}
