import { makeAutoObservable, observable } from "mobx";
import Container, { Service } from "typedi";
import { ICharacterViewModel } from "../models/Character";
import { IRankingService, RANKING_SERVICE } from "../services/RankingService";

@Service()
export class RankingStore {
  private charactersBuffer = observable.array<ICharacterViewModel>();

  private get rankingService(): IRankingService {
    return Container.get<IRankingService>(RANKING_SERVICE);
  }

  public loading: Promise<Array<unknown>>;

  public constructor(){
    makeAutoObservable(this);
    this.loading = Promise.all([
      this.rankingService.getAll().then(characters => this.charactersBuffer.replace(characters)),
    ]);
  }

  public get characters(): Array<ICharacterViewModel> {
    return this.charactersBuffer;
  }
}
