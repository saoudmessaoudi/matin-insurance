using server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Services;

namespace StatsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatsController : ControllerBase
    {
        private readonly StatsService _StatsService;

        public StatsController(StatsService StatsService)
        {
            _StatsService = StatsService;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<List<Stats>> Get() =>
            _StatsService.Get();


        [Authorize]
        [HttpGet("{id:length(24)}", Name = "GetStats")]
        public ActionResult<Stats> Get(string id)
        {
            var Stats = _StatsService.Get(id);

            if (Stats == null)
            {
                return NotFound();
            }

            return Stats;
        }
        
        [Authorize]
        [HttpPost]
        public ActionResult<Stats> Create(Stats Stats)
        {
            _StatsService.Create(Stats);

            return CreatedAtRoute("GetStats", new { id = Stats.Id.ToString() }, Stats);
        }

        
        [Authorize]
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Stats StatsIn)
        {
            var Stats = _StatsService.Get(id);

            if (Stats == null)
            {
                return NotFound();
            }

            _StatsService.Update(id, StatsIn);

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var Stats = _StatsService.Get(id);

            if (Stats == null)
            {
                return NotFound();
            }

            _StatsService.Delete(Stats.Id);

            return NoContent();
        }
    }
}