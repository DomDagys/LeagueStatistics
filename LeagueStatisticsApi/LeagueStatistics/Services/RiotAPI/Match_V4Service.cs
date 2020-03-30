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
        public MatchListDto MatchListById(string accountId, string region, string endIndex, string beginIndex)
        {
            string path = "match/v4/matchlists/by-account/" + accountId +"?endIndex="+endIndex +"&beginIndex="+beginIndex;
            
            var response = GET(GetURIFiltered(path, region));
            
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

        public ICollection<MatchDto> GetMatchHistory(string accountId, string region, string endIndex, string beginIndex)
        {
            var matchList = MatchListById(accountId, region, endIndex, beginIndex);

            ICollection<MatchDto> matchHistory = new List<MatchDto>();
            for (int i = 0; i < matchList.matches.Count; i++)
            {
                var matchDto = MatchInfoById(matchList.matches[i].gameId.ToString(), region);
                matchHistory.Add(matchDto);
            }

            return matchHistory;
        }
    }
}