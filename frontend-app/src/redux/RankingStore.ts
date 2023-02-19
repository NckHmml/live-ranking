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

  public get characters(): Array<ICharacterViewModel> {
    return this.charactersBuffer;
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
      setTimeout(this.syncLock, 0);
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

  // Introducing a lock handler makes the updating less erractic, timeout needs to match or exceed the update cycle
  private syncLock = async () => {
    const lockTimer = new Promise((resolve, _reject) => setTimeout(resolve, 1e3));
    await navigator.locks.request("onExpData", () => lockTimer);
    setTimeout(this.syncLock, 0);
  };

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

  private onExpData = async (id: string, message: string) => {
    const index = this.charactersBuffer.findIndex(x => x.id === id);
    if (index === -1) return; // Happens when the ranking changed the top10 and we are listening to old chars, ToDo: optimize, unlisten
    await navigator.locks.request("onExpData", () => {
      this.charactersBuffer[index].experience = Number(message);
    });
  };

  public getCharacter = (id?: string): ICharacterViewModel | undefined => {
    // ToDo: this needs a new data source, "character service"
    const index = this.charactersBuffer.findIndex(x => x.id === id);
    if (index === -1) return; // Happens when the ranking changed the top10 and we are listening to old chars, ToDo: optimize, unlisten
    return this.charactersBuffer[index];
  };

  public clearAll = async () => {
    await this.rankingService.clearAll();
    await this.loadCharacters();
  };
}
