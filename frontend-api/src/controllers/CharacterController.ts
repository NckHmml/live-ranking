import { Controller, Get, Param } from "routing-controllers";

@Controller()
export class CharacterController {
  @Get("/character")
  public async getAll() {
    const response = await fetch(`${process.env.BACKEND_API}/character`);
    return await response.json();
  }

  @Get("/character/:id")
  public async getOne(@Param("id") id: string) {
    const response = await fetch(`${process.env.BACKEND_API}/character/${id}`);
    return await response.json();
  }
}
