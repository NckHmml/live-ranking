import { ICharacterViewModel } from "../../models/Character";
import { IRankingService } from "../RankingService";

export class BrowserRankingService implements IRankingService {
  public async getAll(): Promise<Array<ICharacterViewModel>> {
    const response = await fetch(`${process.env.REACT_APP_API}/ranking`);
    return response.json();
  }

  public async clearAll(): Promise<void> {
    await fetch(`${process.env.REACT_APP_API}/ranking`, { method: "DELETE" });
  }
}
