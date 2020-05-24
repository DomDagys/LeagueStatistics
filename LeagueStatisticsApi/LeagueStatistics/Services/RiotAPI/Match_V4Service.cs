using LeagueStatistics.Dtos.MatchDtos;
using LeagueStatistics.Dtos.SummonerDtos;
using LeagueStatistics.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

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
            if (matchList == null)
                return null;
            //Sitas daro dalykus match history page, ne pagal id
            ICollection<MatchDto> matchHistory = new List<MatchDto>();
            for (int i = 0; i < matchList.matches.Count; i++)
            {
                var matchDto = MatchInfoById(matchList.matches[i].gameId.ToString(), region);
                if(matchDto.gameDuration > 300) CalculateTips(matchDto, accountId);
                matchHistory.Add(matchDto);
            }

            return matchHistory;
        }

        public void CalculateTips(MatchDto Match, string accountId)
        {
            double creepScore = 0; int times = 0;
            double xpScore = 0; int xptimes = 0;
            double xpDiffScore = 0; int xptimes1 = 0;
            List<string> positiveList = new List<string>();
            List<string> negativeList = new List<string>();
            int id = GetParticipantById(accountId, Match);
            if (Match.participants[id - 1].timeline.creepsPerMinDeltas != null)
            {
                foreach (KeyValuePair<string, double> entry in Match.participants[id - 1].timeline.creepsPerMinDeltas)
                {
                    creepScore += entry.Value;
                    times++;
                }
            }
            if (Match.participants[id - 1].timeline.xpPerMinDeltas != null)
            {
                foreach (KeyValuePair<string, double> entry in Match.participants[id - 1].timeline.xpPerMinDeltas)
                {
                    xpScore += entry.Value;
                    xptimes++;
                }
            }
            if (Match.participants[id - 1].timeline.xpDiffPerMinDeltas != null)
            {
                foreach (KeyValuePair<string, double> entry in Match.participants[id - 1].timeline.xpDiffPerMinDeltas)
                {
                    xpDiffScore += entry.Value;
                    xptimes1++;
                }
            }
            BestAndWorst(positiveList, negativeList, Match, id);
            if (creepScore / times < 4 && Match.participants[id - 1].timeline.role != "DUO_SUPPORT") negativeList.Add("Your average creepScore " + Math.Round(creepScore / times, 2) + " is pretty bad");
            else if (creepScore / times > 6) positiveList.Add("Your creepScore " + Math.Round(creepScore / times, 2) + " is very good");
            if (xpScore / xptimes < 300) negativeList.Add("You should try to gain levels faster");
            else if (xpScore / xptimes > 400) positiveList.Add("Keep up the leveling, it is good");
            if (xpDiffScore / xptimes1 < -50) negativeList.Add("Your enemy laner is usually outleveling you by quite a bit");
            else if (xpDiffScore / xptimes1 > 0) positiveList.Add("On average you are outleveling your enemy, good job!");
            Match.positiveTips = positiveList;
            Match.negativeTips = negativeList;
        }

        public void BestAndWorst(List<string> positiveTips, List<string> negativeTips, MatchDto Match, int id)
        {
            double worstKDAscore = 999, bestKDAscore = 0;
            int worstDeathscore = 0, bestDeathscore = 999;
            long worstVisionscore = 999, bestVisionscore = 0;
            for (int i = 0; i < Match.participants.Count; i++)
            {
                double kda = Match.participants[i].stats.deaths == 0 ? Match.participants[i].stats.kills + Match.participants[i].stats.assists 
                    : (Match.participants[i].stats.kills + Match.participants[i].stats.assists) / Match.participants[i].stats.deaths;
                if (kda > bestKDAscore)
                    bestKDAscore = kda;
                if (kda < worstKDAscore)
                    worstKDAscore = kda;
                int deaths = Match.participants[i].stats.deaths;
                if (deaths > worstDeathscore)
                    worstDeathscore = deaths;
                if (deaths < bestDeathscore)
                    bestDeathscore = deaths;
                long vision = Match.participants[i].stats.visionScore;
                if (vision > bestVisionscore)
                    bestVisionscore = vision;
                if (vision < worstVisionscore)
                    worstVisionscore = vision;
                //---------------------------------------------------------------------------------------
            }
            double summonerKDA = Match.participants[id - 1].stats.deaths == 0 ? Match.participants[id - 1].stats.kills + Match.participants[id - 1].stats.assists
                    : (Match.participants[id - 1].stats.kills + Match.participants[id - 1].stats.assists) / Match.participants[id - 1].stats.deaths;
            if (summonerKDA == bestKDAscore) positiveTips.Add("You had the best KDA in the game good job!");
            if (summonerKDA == worstKDAscore) negativeTips.Add("You had the worst KDA in the game, try better next time!");
            if (Match.participants[id - 1].stats.deaths == bestDeathscore) positiveTips.Add("You died the least in the game, keep that up");
            if (Match.participants[id - 1].stats.deaths == worstDeathscore) negativeTips.Add("Your death rate was the worst(or one of the worst) in the game, try not dying :)");
            if (Match.participants[id - 1].stats.visionScore == bestVisionscore) positiveTips.Add("You had the most vision in the game! keep updating your team with vision");
            if (Match.participants[id - 1].stats.visionScore == worstVisionscore) negativeTips.Add("Your vision score was the lowest in the game, try placing more wards");
        }

        private int GetParticipantById(string accountId, MatchDto Match)
        {
            for (int i = 0; i < 10; i++)
            {
                if (Match.participantIdentities[i].player.currentAccountId.ToString() == accountId)
                    return Match.participantIdentities[i].participantId;
            }
            return 0;
        }

        public ICollection<MatchDto> GetRankedMatchHistoryById(string accountId, string region, string filter, int howMuch)
        {
            var matchList = MatchListById(accountId, region, filter);

            ICollection<MatchDto> matchHistory = new List<MatchDto>();

            for (int i = 0; i < matchList.matches.Count; i++)
            {
                var matchDto = MatchInfoById(matchList.matches[i].gameId.ToString(), region);
                if (matchDto.queueId == 420 && matchHistory.Count < howMuch)
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