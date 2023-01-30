using System.ComponentModel.DataAnnotations;

namespace webapi.DataTemplateObjects;

public class AccountLogin
{
    [Required(ErrorMessage = "Username is required")]
    public string? UserName { get; init; }

    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; init; }
}