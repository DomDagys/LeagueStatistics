using LeagueStatistics.Dtos.SummonerDtos;
using LeagueStatistics.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.RiotAPI
{
    public class League_V4Service : GeneralAPI, ILeague_V4Service
    {
        private readonly ISummoner_V4Service _summonerService;
        public League_V4Service(ISummoner_V4Service summonerService)
        {
            _summonerService = summonerService;
        }

        public List<LeagueEntryDto> GetQueueInfoByName(string summonerName, string region)
        {
            var summonerInfo = _summonerService.GetSummonerByName(summonerName, region);
            string path = "league/v4/entries/by-summoner/" + summonerInfo.id;

            var response = GET(GetURI(path, region));
            string content = response.Content.ReadAsStringAsync().Result;

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<List<LeagueEntryDto>>(content);
            }
            else
            {
                return null;
            }
        }
    }
}
