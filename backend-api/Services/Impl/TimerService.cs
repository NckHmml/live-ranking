using backend_api.Models;

namespace backend_api.Services;

public class TimerService : IHostedService, IDisposable
{
  private Timer? Timer { get; set; }
  private ILogger<TimerService> Logger { get; }
  private ICharacterService CharacterService { get; }

  public TimerService(ILogger<TimerService> logger,
                      ICharacterService characterService)
  {
    Logger = logger;
    CharacterService = characterService;
  }

  public void Dispose()
  {
    Timer?.Dispose();
  }

  public Task StartAsync(CancellationToken cancellationToken)
  {
    Logger.LogInformation("Timer service started.");
    Timer = new Timer(DoTick, null, TimeSpan.FromMilliseconds(1000), TimeSpan.FromMilliseconds(1000));

    return Task.CompletedTask;
  }

  public Task StopAsync(CancellationToken cancellationToken)
  {
    Logger.LogInformation("Timer service stopping.");
    Timer?.Change(Timeout.Infinite, 0);

    return Task.CompletedTask;
  }

  private void DoTick(object? state)
  {
    Logger.LogInformation("Timer tick.");
    IEnumerable<Character> characters = CharacterService.GetCharacters();
    var random = new Random();
    foreach (Character character in characters)
    {
      var bonus = (long)Math.Min(character.Experience / 5, 1e4); // Bonus makes the top of the leaderboard "run ahead" due to luck increasing the max random
      var exp = random.NextInt64(1, 1000 + bonus);
      CharacterService.AddExp(character.Id, exp);
    }
  }
}