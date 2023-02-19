using backend_api.Models;
using StackExchange.Redis;

namespace backend_api.Services;

public class CharacterService : ICharacterService
{
  private IDictionary<Guid, WritableCharacter> Cache { get; } = new Dictionary<Guid, WritableCharacter>();
  private IConnectionMultiplexer Multiplexer { get; }
  private IDatabase RedisDatabase { get { return Multiplexer.GetDatabase(); } }

  public CharacterService(IConnectionMultiplexer multiplexer)
  {
    Multiplexer = multiplexer;
    for (var i = 0; i < 150; i++)
    {
      var character = new WritableCharacter
      {
        Name = $"Player_{i.ToString("D3")}",
      };
      Cache.Add(character.Id, character);
    }
  }

  public Character GetCharacter(Guid id)
  {
    return Cache[id];
  }

  public IEnumerable<Character> GetCharacters()
  {
    return Cache.Values;
  }

  public void AddExp(Guid id, long exp)
  {
    WritableCharacter character = Cache[id];
    character.SetExp(character.Experience + exp);
    RedisDatabase.Publish($"experience:{id}", character.Experience.ToString());
    RedisDatabase.SortedSetAdd("players", id.ToString(), character.Experience);
  }

  public void ClearExp()
  {
    foreach (WritableCharacter character in Cache.Values)
    {
      character.SetExp(0);
      RedisDatabase.Publish($"experience:{character.Id}", 0);
      RedisDatabase.SortedSetAdd("players", character.Id.ToString(), character.Experience);
    }
  }
}