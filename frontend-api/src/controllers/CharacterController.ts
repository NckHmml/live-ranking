import { Controller, Get, Param } from "routing-controllers";

@Controller()
export class CharacterController {
  @Get("/character")
  public async getAll() {
    const response = await fetch("http://localhost:8081/character");
    return await response.json();
  }

  @Get("/character/:id")
  public async getOne(@Param("id") id: string) {
    const response = await fetch(`http://localhost:8081/character/${id}`);
    return await response.json();
  }
}
