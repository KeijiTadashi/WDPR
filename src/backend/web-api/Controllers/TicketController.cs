using webapi.Data;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using webapi.DataTemplateObjects;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class TicketController : ControllerBase
{
    private readonly WdprContext _context;
    private readonly UserManager<Account> _userManager;

    public TicketController(WdprContext context, UserManager<Account> userManager)
    {
        _context = context;
        _userManager = userManager;
    }


    [HttpGet("{uitvoeringId}")]
    public IEnumerable<Ticket?> GetTicketsUitvoering(int uitvoeringId)
    {
        var tickets = _context.Tickets.Where(t => t.Uitvoering.Id == uitvoeringId);
        foreach (Ticket t in tickets)
        {
            t.Klant = null;
        }
        return tickets;
    }

    [Authorize]
    [HttpGet("GetTicketsCurrentUser/{userName}")]
    public async Task<IEnumerable<Ticket?>> GetTicketsAccount(string userName)
    {
        // var userClaim = this.User;
        System.Console.WriteLine("GET TICKETS 1");
        // var user = await _userManager.FindByNameAsync(HttpContext.Current.User.Identity.Name);
        // var user = await _userManager.GetUserAsync(User); // For some reason null even though you have to be authorized (a loggedin user for this function)
        var user = await _userManager.FindByNameAsync(userName);
        var tickets = _context.Tickets
        .Include(t => t.Klant)
        .Include(t => t.Uitvoering).ThenInclude(u => u.Voorstelling)
        .Include(t => t.Uitvoering).ThenInclude(u => u.Zaal)
        .Include(t => t.Zitplaats)
        .Where(t => t.Klant == user);
        return tickets;
    }

    [Authorize]
    [HttpPost("BuyTicket")]
    public async Task<IActionResult> BuyTicket([FromBody] TicketBuy t)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(System.Security.Claims.ClaimsPrincipal.Current.Identity.Name);
            var uitvoering = _context.Uitvoeringen.Single(u => u.Id == t.UitvoeringId);
            var zitplaats = _context.Zitplaatsen.Single(z => z.Id == t.ZitplaatsId);
            await _context.Tickets.AddAsync(new Ticket() { Klant = user, Uitvoering = uitvoering, Zitplaats = zitplaats });
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch
        {
            return BadRequest("Kon het kaartje niet kopen");
        }
        // var ticket = await _context.Tickets.FindAsync(t.Id);
        // if (ticket == null)
        //     return Problem(title: "Unknown ticket", detail: $"The ticket with id: {t.Id} couldn't be found.", statusCode: StatusCodes.Status404NotFound);
        // ticket.IsSold = true;
        // ticket.Klant = user;
        // if (await TryUpdateModelAsync<Ticket>(ticket))
        //     return Ok();
        // return BadRequest();
    }
}