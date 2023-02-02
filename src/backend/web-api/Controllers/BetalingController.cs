using webapi.Data;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using webapi.DataTemplateObjects;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using webapi.Controllers;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class BetalingController : ControllerBase
{
    private readonly WdprContext _context;
    private readonly UserManager<Account> _userManager;

    public BetalingController(WdprContext context, UserManager<Account> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [Authorize]
    [HttpPost]
    [Route("BeginBetaling")]
    public async Task<ActionResult<int>> BeginBetaling([FromBody] BetalingBeginBetaling bbb)
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        // var userName = identity.Claims.GetType().GetProperty("name").GetValue(identity);
        var claims = identity.Claims;
        var userName = claims.FirstOrDefault(c => c.Type == "name").Value;

        // foreach (var c in claims)
        // {
        //     System.Console.WriteLine($"CLAIMS: {c}");
        //     System.Console.WriteLine($"Value: {c.Value}, Properties: {c.Properties}, Type: {c.Type}, ValueType: {c.ValueType}");
        // }
        var user = await _userManager.FindByNameAsync(userName);
        if (user != null)
        {
            List<Ticket> tickets = new List<Ticket>();
            foreach (int z in bbb.ZitplaatsenIds)
            {
                tickets.Add(await BuyTicket(bbb.UitvoeringId, z, user));
            }
            Betaling b = new Betaling() { Klant = user, Status = "In Process", tickets = tickets };
            await _context.Betalingen.AddAsync(b);
            await _context.SaveChangesAsync();
            return Ok(b.Id);
        }
        return BadRequest();
    }

    private async Task<Ticket> BuyTicket(int uitvoeringId, int zitplaatsId, Account user)
    {
        var uitvoering = await _context.Uitvoeringen.SingleAsync(u => u.Id == uitvoeringId);
        var zitplaats = await _context.Zitplaatsen.SingleAsync(z => z.Id == zitplaatsId);
        Ticket ticket = new Ticket() { Klant = user, Uitvoering = uitvoering, Zitplaats = zitplaats };
        await _context.Tickets.AddAsync(ticket);
        await _context.SaveChangesAsync();
        return ticket;
    }

}