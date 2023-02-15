namespace backend_api.Models;

public class WritableCharacter : Character
{
  public void SetExp(long exp)
  {
    Experience = exp;
  }
}
