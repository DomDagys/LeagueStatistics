using LeagueStatistics.Services.Interfaces;
using LeagueStatistics.Dtos.ChampionMasteryDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.RiotAPI
{
    public class ChampionMastery_V4Service : GeneralAPI, IChampionMastery_V4Service
    {
        public List<ChampionMasteryListDto> ChampionMasteryBySummonerId(string summonerId, string region)
        {
            var path = "champion-mastery/v4/champion-masteries/by-summoner/" + summonerId;

            var response = GET(GetURI(path, region));

            string content = response.Content.ReadAsStringAsync().Result;

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<List<ChampionMasteryListDto>>(content);
            }
            else
            {
                return null;
            }
        }
    }
}
