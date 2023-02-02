using System.ComponentModel.DataAnnotations;
using webapi.Models;

namespace webapi.DataTemplateObjects;

public class BetalingBeginBetaling
{
    public List<int> ZitplaatsenIds { get; set; }
    public int UitvoeringId { get; set; }
}