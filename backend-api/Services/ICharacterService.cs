using backend_api.Models;

namespace backend_api.Services;

public interface ICharacterService {
  public Character GetCharacter(Guid id);
  public IEnumerable<Character> GetCharacters();
  public void AddExp(Guid id, long exp);
}