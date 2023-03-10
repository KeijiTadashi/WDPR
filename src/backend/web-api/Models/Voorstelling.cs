namespace webapi.Models;

public class Voorstelling
{
    public int Id { get; set; }
    public string Naam { get; set; }
    public string Beschrijving { get; set; }
    public string Soort { get; set; }
    public byte[]? Image { get; set; }
    public float prijs1 { get; set; }
    public float prijs2 { get; set; }
    public float prijs3 { get; set; }
    public float prijs4 { get; set; }
}
