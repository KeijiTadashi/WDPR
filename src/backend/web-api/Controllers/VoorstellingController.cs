using webapi.Data;
using webapi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class VoorstellingController : ControllerBase
{
    private readonly WdprContext _context;

    public VoorstellingController(WdprContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Voorstelling> Get()
    {
        return _context.Voorstellingen;
    }

    [HttpGet("{id}")]
    public async Task<Voorstelling?> Get(int id)
    {
        return await _context.Voorstellingen.FindAsync(id);
    }

    [Authorize(Roles = $"{Roles.Admin},{Roles.Directie}")]
    [HttpPost]
    public async Task<IActionResult> AddVoorstelling([FromBody] Voorstelling v)
    {
        await _context.Voorstellingen.AddAsync(v);
        var result = await _context.SaveChangesAsync();
        return Ok();
    }

}