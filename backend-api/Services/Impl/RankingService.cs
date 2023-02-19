using backend_api.Models;
using StackExchange.Redis;

namespace backend_api.Services;

public class RankingService : IRankingService
{
  private IConnectionMultiplexer Multiplexer { get; }
  private IDatabase RedisDatabase { get { return Multiplexer.GetDatabase(); } }
  private ICharacterService CharacterService { get; }

  public RankingService(IConnectionMultiplexer multiplexer, ICharacterService characterService)
  {
    Multiplexer = multiplexer;
    CharacterService = characterService;
    ClearRanking();
  }

  public IEnumerable<Character> GetRankedCharacters(int amount)
  {
    IEnumerable<Character> players = RedisDatabase
      .SortedSetRangeByRank("players", 0, amount - 1, Order.Descending)
      .Where(x => !String.IsNullOrWhiteSpace(x))
      .Select(x => Guid.Parse(x!))
      .Select(x => CharacterService.GetCharacter(x));
    return players;
  }

  public void ClearRanking()
  {
    CharacterService.ClearExp();
  }
}
