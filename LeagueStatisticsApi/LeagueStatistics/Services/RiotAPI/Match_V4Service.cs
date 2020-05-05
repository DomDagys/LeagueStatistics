using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeagueStatistics.Dtos.MatchDtos;
using LeagueStatistics.Dtos.SummonerDtos;
using LeagueStatistics.Services.Interfaces;

namespace LeagueStatistics.Services.RiotAPI
{
    public class Match_V4Service : GeneralAPI, IMatch_V4Service
    {
        private readonly ISummoner_V4Service _summonerService;

        public Match_V4Service(ISummoner_V4Service summonerService)
        {
            _summonerService = summonerService;
        }

        public MatchListDto MatchListById(string accountId, string region, string filter)
        {
            string path = "match/v4/matchlists/by-account/" + accountId + filter;
            
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

        public ICollection<MatchDto> GetMatchHistory(string accountId, string region, string filter)
        {

            var matchList = MatchListById(accountId, region, filter);

            
            ICollection<MatchDto> matchHistory = new List<MatchDto>();
            for (int i = 0; i < matchList.matches.Count; i++)
            {
                var matchDto = MatchInfoById(matchList.matches[i].gameId.ToString(), region);
                matchHistory.Add(matchDto);
            }

            return matchHistory;
        }

        public ICollection<MatchDto> GetRankedMatchHistoryById(string accountId, string region, string filter, int howMuch)
        {
            var matchList = MatchListById(accountId, region, filter);

            ICollection<MatchDto> matchHistory = new List<MatchDto>();

            for(int i = 0; i < matchList.matches.Count;i++)
            {
                var matchDto = MatchInfoById(matchList.matches[i].gameId.ToString(), region);

                if(matchDto.queueId == 420 && matchHistory.Count < howMuch)
                {
                    matchHistory.Add(matchDto);
                }
            }
            return matchHistory;
        }

        public List<ChampionDto> GetSummonerChampionList(string summonerName, string region, string queueID)
        {
            var filter = "?queue=" + queueID;

            var summonerInfo = _summonerService.GetSummonerByName(summonerName, region);
            if (summonerInfo == null)
                return null;
            var MatchList = MatchListById(summonerInfo.accountId, region, filter);
            if (MatchList == null)
                return null;
            Dictionary<int, int> championsPlayed = new Dictionary<int, int>();
            List<int> championIds = new List<int>();
            int beginCounter = 100, endCounter = 200;
            while (MatchList.matches.Count != 0)
            {
                for (int i = 0; i < MatchList.matches.Count; i++)
                {
                    if (MatchList.matches[i].timestamp > 1578621600000)
                    {
                        if (!championIds.Contains(MatchList.matches[i].champion))
                        {
                            championIds.Add(MatchList.matches[i].champion);
                            championsPlayed[MatchList.matches[i].champion] = 1;
                        }
                        else
                        {
                            championsPlayed[MatchList.matches[i].champion] = championsPlayed[MatchList.matches[i].champion] + 1;
                        }
                    }
                    else continue;
                }
                string filter1 = filter;
                filter1 += "&endIndex=" + endCounter + "&beginIndex=" + beginCounter;
                beginCounter += 100;
                endCounter += 100;
                MatchList = MatchListById(summonerInfo.accountId, region, filter1);
            }
            var ordered = championsPlayed.OrderByDescending(x => x.Value);
            List<ChampionDto> topChampions = new List<ChampionDto>();
            foreach (var smthn in ordered)
            {
                ChampionDto champion = new ChampionDto();
                champion.championId = smthn.Key;
                champion.gamesPlayed = smthn.Value;
                topChampions.Add(champion);
            }
            if (topChampions.Count < 5)
                return topChampions;
            else
                return topChampions.GetRange(0, 5);
        }
    }
}