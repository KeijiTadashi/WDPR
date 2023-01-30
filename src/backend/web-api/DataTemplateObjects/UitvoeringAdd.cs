
namespace webapi.DataTemplateObjects;

public class UitvoeringAdd
{
    public int Id { get; set; }
    public DateTime BeginTijd { get; set; }
    public DateTime EindTijd { get; set; }

    public int VoorstellingId { get; set; }
}