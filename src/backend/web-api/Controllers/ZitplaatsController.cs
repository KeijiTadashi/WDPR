using webapi.Data;
using webapi.Models;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ZitplaatsController : ControllerBase
{
    private readonly WdprContext _context;
    
    public ZitplaatsController(WdprContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public IEnumerable<Zitplaats> GetZitplaatsen()
    {
        return _context.Zitplaatsen;
    }
    
    [HttpGet("{id:int}")]
    public async Task<Zitplaats?> GetZitplaats(int id)
    {
        return await _context.Zitplaatsen.FindAsync(id);
    }
    
    [HttpPost]
    public async Task CreateZitplaats(Zitplaats zitplaats)
    {
        _context.Zitplaatsen.Add(zitplaats);
        await _context.SaveChangesAsync();
    }
}