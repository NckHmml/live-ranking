import { ICharacterViewModel } from "../../models/Character";
import { RankingService } from "../RankingService";

export class ServerRankingService extends RankingService {
  public async getAll(): Promise<Array<ICharacterViewModel>> {
    const response = await fetch(`http://${process.env.REACT_APP_API}/ranking`);
    return response.json();
  }

  public clearAll(): Promise<void> {
    // This shouldn't happen server sided
    throw new Error("Method not implemented.");
  }
}
