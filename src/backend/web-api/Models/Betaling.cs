namespace webapi.Models;

public class Betaling
{
    public int Id { get; set; }

    public Account Klant { get; set; }

    public List<Ticket> tickets { get; set; }
    public string Status { get; set; }
}