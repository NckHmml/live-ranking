import { ICharacterViewModel } from "../../models/Character";
import { IRankingService } from "../RankingService";

export class ServerRankingService implements IRankingService {
  public async getAll(): Promise<Array<ICharacterViewModel>> {
    const response = await fetch(`${process.env.REACT_APP_API}/ranking`);
    return response.json();
  }

  public clearAll(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
