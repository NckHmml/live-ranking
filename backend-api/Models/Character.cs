namespace backend_api.Models;

public class Character
{
  public long Experience { get; protected set; }
  public long Level
  {
    get
    {
      // ToDo: calculate based on EXP based on a simple graph
      return 0;
    }
  }
  public string? Name { get; set; }
  public Guid Id { get; protected set; } = Guid.NewGuid();
}
