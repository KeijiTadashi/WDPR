using System.ComponentModel.DataAnnotations;

namespace webapi.DataTemplateObjects;

public class MedewerkerRegistreer : AccountRegistreer
{
    [Required(ErrorMessage = "Functie is required")]
    public string Functie { get; init; }
}