using backend_api.Models;
using backend_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers;

[ApiController]
[Route("[controller]")]
public class RankingController : ControllerBase
{
  private ILogger<CharacterController> Logger { get; }
  private IRankingService RankingService { get; }

  public RankingController(ILogger<CharacterController> logger,
                           IRankingService rankingService)
  {
    Logger = logger;
    RankingService = rankingService;
  }

  [HttpGet(Name = "GetRanking")]
  public IEnumerable<Character> GetAll(int top = 10)
  {
    Logger.LogInformation($"GET ranking");
    return RankingService.GetRankedCharacters(top);
  }

  [HttpDelete(Name = "ClearRanking")]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  public IActionResult ClearAll()
  {
    Logger.LogInformation($"DELETE ranking");
    RankingService.ClearRanking();
    return NoContent();
  }

}