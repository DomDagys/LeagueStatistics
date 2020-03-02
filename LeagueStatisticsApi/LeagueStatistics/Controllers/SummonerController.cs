using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeagueStatistics.Dtos.SummonerDtos;
using LeagueStatistics.Services.RiotAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LeagueStatistics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SummonerController : ControllerBase
    {
        // GET: api/Summoner
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Summoner/5
        [HttpGet("{id}")]//, Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Summoner
        [HttpPost]
        [Produces(typeof(SummonerDto))]
        public IActionResult Post(string region, string summonerName)
        {
            Summoner_V4 Summoner = new Summoner_V4(region);

            var summonerInfo = Summoner.GetSummonerByName(summonerName);
            //return "PEtras";
            return Ok(summonerInfo);
        }

        // PUT: api/Summoner/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
