import { Controller, Delete, Get } from "routing-controllers";

@Controller()
export class RankingController {
  @Get("/ranking")
  public async getAll() {
    const response = await fetch(`${process.env.BACKEND_API}/ranking`);
    return await response.json();
  }

  @Delete("/ranking")
  public async clearAll() {
    const response = await fetch(`${process.env.BACKEND_API}/ranking`, { method: "DELETE" });
    return await response.json();
  }
}
