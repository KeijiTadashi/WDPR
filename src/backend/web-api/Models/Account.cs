using Microsoft.AspNetCore.Identity;

namespace webapi.Models;

public class Account : IdentityUser
{
    public string AccountType { get; set; }
}