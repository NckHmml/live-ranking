import { ICharacterViewModel } from "../../models/Character";
import { RankingService } from "../RankingService";

export class BrowserRankingService extends RankingService {
  public async getAll(): Promise<Array<ICharacterViewModel>> {
    const response = await fetch(`http://${process.env.REACT_APP_API}/ranking`);
    return response.json();
  }

  public async clearAll(): Promise<void> {
    await fetch(`http://${process.env.REACT_APP_API}/ranking`, { method: "DELETE" });
  }
}
