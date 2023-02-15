using backend_api.Models;
using backend_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers;

[ApiController]
[Route("[controller]")]
public class CharacterController : ControllerBase
{
  private ILogger<CharacterController> Logger { get; }
  private ICharacterService CharacterService { get; }

  public CharacterController(ILogger<CharacterController> logger,
                             ICharacterService characterService)
  {
    Logger = logger;
    CharacterService = characterService;
  }

  [HttpGet(Name = "GetCharacter")]
  public IEnumerable<Character> GetAll()
  {
    Logger.LogInformation($"GET characters");
    return CharacterService.GetCharacters();
  }

  [HttpGet("{id}", Name = "GetCharacterById")]
  public Character Get(string id)
  {
    Logger.LogInformation($"GET character:${id}");
    return CharacterService.GetCharacter(Guid.Parse(id));
  }
}
