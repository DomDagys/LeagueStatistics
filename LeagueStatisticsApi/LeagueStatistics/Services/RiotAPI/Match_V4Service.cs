using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeagueStatistics.Dtos.MatchDtos;
using LeagueStatistics.Services.Interfaces;

namespace LeagueStatistics.Services.RiotAPI
{
    public class Match_V4Service : GeneralAPI, IMatch_V4Service
    {
        public MatchListDto MatchHistoryById(string accountId, string region)
        {
            string path = "match/v4/matchlists/by-account/" + accountId;
            
            var response = GET(GetURI(path, region));
            
            string content = response.Content.ReadAsStringAsync().Result;
            
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<MatchListDto>(content);
            }
            else
            {
                return null;
            }
        }
        public MatchDto MatchInfoById(string matchId, string region)
        {
            string path = "match/v4/matches/" + matchId;

            var response = GET(GetURI(path, region));

            string content = response.Content.ReadAsStringAsync().Result;

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<MatchDto>(content);
            }
            else
            {
                return null;
            }
        }
    }
}