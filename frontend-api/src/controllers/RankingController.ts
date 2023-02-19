import { Controller, Delete, Get, OnUndefined } from "routing-controllers";

@Controller()
export class RankingController {
  @Get("/ranking")
  public async getAll() {
    const response = await fetch(`${process.env.BACKEND_API}/ranking`);
    return await response.json();
  }

  @Delete("/ranking")
  @OnUndefined(204)
  public async clearAll() {
    await fetch(`${process.env.BACKEND_API}/ranking`, { method: "DELETE" });
  }
}
