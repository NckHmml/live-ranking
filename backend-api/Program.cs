using backend_api.Services;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Redis
IConnectionMultiplexer multiplexer = ConnectionMultiplexer.Connect("redis");
builder.Services.AddSingleton(multiplexer);

// Character service
ICharacterService characterService = new CharacterService(multiplexer);
builder.Services.AddSingleton(characterService);

// Character exp timer
builder.Services.AddHostedService<TimerService>();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
