using backend_api.Services;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);


// Redis & Services
IConnectionMultiplexer multiplexer = ConnectionMultiplexer.Connect(builder.Configuration["RedisHost"]);
ICharacterService characterService = new CharacterService(multiplexer);
IRankingService rankingService = new RankingService(multiplexer, characterService);
builder.Services
  .AddSingleton(multiplexer)
  .AddSingleton(characterService)
  .AddSingleton(rankingService)
  // Character exp timer
  .AddHostedService<TimerService>()
  // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
  .AddEndpointsApiExplorer()
  .AddSwaggerGen();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
