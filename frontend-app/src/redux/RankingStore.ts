import { makeAutoObservable, observable, runInAction } from "mobx";
import Container, { Service } from "typedi";
import { RouterState } from "@remix-run/router";

import { WebSocketService } from "services/WebSocketService";
import { RankingService } from "services/RankingService";
import { ICharacterViewModel } from "models/Character";

@Service()
export class RankingStore {
  private charactersBuffer = observable.array<ICharacterViewModel>();

  private get rankingService(): RankingService {
    return Container.get(RankingService);
  }

  private get webSocketService(): WebSocketService {
    return Container.get(WebSocketService);
  }

  public loading: Promise<Array<unknown>>;

  public constructor() {
    makeAutoObservable(this);
    this.loading = Promise.all([
      this.loadCharacters(),
    ]);

    // Refresh data when cache is old, only on browser
    if (process.env.REACT_APP_PLATFORM === "BROWSER") {
      setInterval(this.loadCharacters, 30 * 1e3);
    }
  }

  public hydrate(data: Partial<Pick<RouterState, "loaderData" | "actionData" | "errors">>) {
    if (!Boolean(data.loaderData?.["ranking"])) return;

    const characters = data.loaderData!["ranking"] as Array<ICharacterViewModel>;
    this.charactersBuffer.replace(characters);
    this.onCharacters(characters);

    // Re-assign it so it will be an observable the next use
    // eslint-disable-next-line no-param-reassign
    data.loaderData!["ranking"] = this.charactersBuffer;
  }

  private loadCharacters = async () => {
    const characters = await this.rankingService.getAll();
    runInAction(() => this.charactersBuffer.replace(characters));
    this.onCharacters(characters);
  };

  private onCharacters = (characters: Array<ICharacterViewModel>) => {
    for (const character of characters) {
      this.webSocketService.join(`experience:${character.id}`, (message) => this.onExpData(character.id, message));
    }
  };

  private onExpData = (id: string, message: string) => {
    const index = this.charactersBuffer.findIndex(x => x.id === id);
    if (index === -1) return; // Happens when the ranking changed the top10 and we are listening to old chars, ToDo: optimize, unlisten
    this.charactersBuffer[index].experience = Number(message);
  };

  public getCharacter = (id?: string): ICharacterViewModel | undefined => {
    // ToDo: this needs a new data source, "character service"
    const index = this.charactersBuffer.findIndex(x => x.id === id);
    if (index === -1) return; // Happens when the ranking changed the top10 and we are listening to old chars, ToDo: optimize, unlisten
    return this.charactersBuffer[index];
  };

  public get characters(): Array<ICharacterViewModel> {
    return this.charactersBuffer;
  }
}
