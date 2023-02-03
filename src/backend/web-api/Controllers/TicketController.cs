using webapi.Data;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using webapi.DataTemplateObjects;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
        var tickets = _context.Tickets.Where(t => t.Uitvoering.Id == uitvoeringId).Include(t => t.Zitplaats).Include(t => t.Klant).Include(t => t.Uitvoering);
        return tickets;
    }

    [Authorize]
    [HttpGet("GetTicketsCurrentUser")]
    public async Task<IEnumerable<Ticket?>> GetTicketsAccount()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        var claims = identity.Claims;
        var userName = claims.FirstOrDefault(c => c.Type == "name").Value;

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
    public async Task<ActionResult<Ticket>> BuyTicket([FromBody] TicketBuy t)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(System.Security.Claims.ClaimsPrincipal.Current.Identity.Name);
            var uitvoering = await _context.Uitvoeringen.SingleAsync(u => u.Id == t.UitvoeringId);
            var zitplaats = await _context.Zitplaatsen.SingleAsync(z => z.Id == t.ZitplaatsId);
            Ticket ticket = new Ticket() { Klant = user, Uitvoering = uitvoering, Zitplaats = zitplaats };
            await _context.Tickets.AddAsync(ticket);
            await _context.SaveChangesAsync();
            return Ok(ticket);
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