using webapi.Data;
using webapi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using webapi.DataTemplateObjects;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class UitvoeringController : ControllerBase
{
    private readonly WdprContext _context;

    public UitvoeringController(WdprContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Uitvoering?> Get()
    {
        return _context.Uitvoeringen;
    }

    [HttpGet("{id}")]
    public async Task<Uitvoering?> Get(int id)
    {
        // return await _context.Uitvoeringen.FindAsync(id);
        return _context.Uitvoeringen.Include(u => u.Voorstelling).Where(u => u.Id == id).Single();
    }

    [HttpGet("GetUitvoeringenVoorstelling/{id}")]
    public IEnumerable<Uitvoering?> GetuitvoeringenVoorstelling(int id)
    {

        System.Console.WriteLine("GET UITVOERINGEN VAN VOORSTELLING " + id);
        var uitvoeringen = _context.Uitvoeringen.Where(u => u.Voorstelling.Id == id);
        System.Console.WriteLine(uitvoeringen);
        return uitvoeringen;
    }

    [Authorize(Roles = $"{Roles.Admin},{Roles.Directie}")]
    [HttpPost("AddUitvoering")]
    public async Task<IActionResult> AddUitvoering([FromBody] UitvoeringAdd u)
    {
        var voorstelling = await _context.Voorstellingen.FindAsync(u.VoorstellingId);
        if (voorstelling == null)
            return Problem(title: "Unknown voorstelling", detail: $"The voorstelling: {u.VoorstellingId} couldn't be found.", statusCode: StatusCodes.Status404NotFound);
        var uitvoering = new Uitvoering() { BeginTijd = u.BeginTijd, EindTijd = u.EindTijd, Voorstelling = voorstelling };
        await _context.Uitvoeringen.AddAsync(uitvoering);
        var result = await _context.SaveChangesAsync();
        return StatusCode(201);

    }

    [Authorize(Roles = $"{Roles.Admin},{Roles.Directie}")]
    [HttpPost("AddUitvoeringen")]
    public async Task<IActionResult> AddUitvoeringen([FromBody] UitvoeringenAdd uitvoeringen)
    {
        foreach (UitvoeringAdd u in uitvoeringen.Uitvoeringen)
        {
            var voorstelling = await _context.Voorstellingen.FindAsync(u.VoorstellingId);
            if (voorstelling == null)
                return Problem(title: "Unknown voorstelling", detail: $"The voorstelling: {u.VoorstellingId} couldn't be found.", statusCode: StatusCodes.Status404NotFound);
            var uitvoering = new Uitvoering() { BeginTijd = u.BeginTijd, EindTijd = u.EindTijd, Voorstelling = voorstelling };
            await _context.Uitvoeringen.AddAsync(uitvoering);
        }
        var result = await _context.SaveChangesAsync();
        return Ok();

    }
}