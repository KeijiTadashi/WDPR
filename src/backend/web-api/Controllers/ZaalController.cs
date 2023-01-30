using webapi.Data;
using webapi.Models;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class ZaalController : ControllerBase
{
    private readonly WdprContext _context;
    
    public ZaalController(WdprContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public IEnumerable<Zaal?> GetZalen()
    {
        return _context.Zalen;
    }

    [HttpGet("{id:int}")]
    public async Task<Zaal?> GetZaal(int id)
    {
        return await _context.Zalen.FindAsync(id);
    }

    [HttpGet("{id:int}/zitplaatsen")]
    public IEnumerable<Zitplaats> GetZaalZitplaatsen(int id)
    {
        return _context.Zitplaatsen.Where(z => z.ZaalId == id);
    }
}