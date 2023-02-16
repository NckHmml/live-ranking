using backend_api.Models;

namespace backend_api.Services;

public interface IRankingService
{
  public IEnumerable<Character> GetRankedCharacters(int amount);
  public void ClearRanking();
}