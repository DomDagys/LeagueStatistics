using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeagueStatistics.Dtos.LiveGameDto;
using LeagueStatistics.Services.Interfaces;

namespace LeagueStatistics.Services.RiotAPI
{
    public class LiveGameV4_Service : GeneralAPI, ILiveGame_V4Service
    {
        public CurrentGameInfoDto LiveGameInfoById(string summonerId, string region)
        {
            var path = "spectator/v4/active-games/by-summoner/" + summonerId;

            var response = GET(GetURI(path, region));

            string content = response.Content.ReadAsStringAsync().Result;

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<CurrentGameInfoDto>(content);
            }
            else
            {
                return null;
            }
        }
    }
}
