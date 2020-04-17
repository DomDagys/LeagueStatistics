using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeagueStatistics.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LeagueStatistics.Dtos.LiveGameDto;

namespace LeagueStatistics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiveGameController : ControllerBase
    {
        private readonly ILiveGame_V4Service _liveGameService;

        public LiveGameController(ILiveGame_V4Service liveGameService)
        {
            _liveGameService = liveGameService;
        }

        // Get: api/LiveGame
        [HttpGet]
        [Produces(typeof(ICollection<CurrentGameInfoDto>))]
        public IActionResult LiveGameInfoById(string summonerId, string region)
        {
            var liveGameInfo = _liveGameService.LiveGameInfoById(summonerId, region);

            return Ok(liveGameInfo);
        }

    }
}
