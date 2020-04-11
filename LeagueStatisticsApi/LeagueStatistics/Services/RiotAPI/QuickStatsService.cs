using LeagueStatistics.Dtos.MatchDtos;
using LeagueStatistics.Dtos.SummonerDtos;
using LeagueStatistics.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.RiotAPI
{
    public class QuickStatsService : IQuickStatsService
    {
        private readonly ISummoner_V4Service _summonerService;
        private readonly IMatch_V4Service _matchService;

        public QuickStatsService(ISummoner_V4Service summonerService, IMatch_V4Service matchService)
        {
            _summonerService = summonerService;
            _matchService = matchService;
        }

        public QuickStatsDto QuickStatsCalculation(string summonerName, string region)
        {
            var filter = "?endIndex=10&beginIndex=0";

            var summonerInfo = _summonerService.GetSummonerByName(summonerName, region);
            var MatchList = _matchService.MatchListById(summonerInfo.accountId, region, filter);
            QuickStatsDto stats = new QuickStatsDto();
            //-----------------------------------------------------------
            List<ChampionDto> championsPlayed = new List<ChampionDto>();
            List<int> championIds = new List<int>();
            List<RoleDto> roleList = new List<RoleDto>();
            //-----------------------------------------------------------
            if (MatchList.totalGames < 10)
            {
                roleList = AssignRoles();
                for (int i = 0; i < MatchList.totalGames; i++)
                {
                    var Match = _matchService.MatchInfoById(MatchList.matches[i].gameId.ToString(), region);
                    int id = GetParticipantBySummonerName(summonerName, Match);
                    //-------------------------------------------------------
                    //Work with roles
                    CheckForRoles(MatchList.matches[i].lane, roleList);
                    //-------------------------------------------------------
                    //Work with Summoner stats and Champion stats
                    StatsCalculations(stats, Match, id, championIds, championsPlayed);
                }
                List<ChampionDto> filteredList = FilterChampionList(championsPlayed, championIds);
                if (filteredList.Count < 3)
                    stats.favoriteChampions = filteredList.GetRange(0, filteredList.Count);
                else
                    stats.favoriteChampions = filteredList.GetRange(0, 3);
                stats.favoriteRoles = roleList;
                stats.gamesPlayed = MatchList.totalGames;

                if (stats.deaths != 0)
                    stats.kda = Math.Round(((double)(stats.kills + stats.assists) / stats.deaths), 2);
                else stats.kda = Math.Round((double)(stats.kills + stats.assists), 2);
                for (int i = 0; i < stats.favoriteChampions.Count; i++)
                {
                    if (stats.favoriteChampions[i].deaths != 0)
                        stats.favoriteChampions[i].kda = Math.Round((double)(stats.favoriteChampions[i].kills + stats.favoriteChampions[i].assists)
                        / stats.favoriteChampions[i].deaths, 2);
                    else stats.favoriteChampions[i].kda = Math.Round((double)(stats.favoriteChampions[i].kills + stats.favoriteChampions[i].assists), 2);
                }
            }
            else
            {
                roleList = AssignRoles();
                for (int i = 0; i < 10; i++)
                {
                    var Match = _matchService.MatchInfoById(MatchList.matches[i].gameId.ToString(), region);
                    int id = GetParticipantBySummonerName(summonerName, Match);
                    //-------------------------------------------------------
                    //Work with roles
                    CheckForRoles(MatchList.matches[i].lane, roleList);
                    //-------------------------------------------------------
                    //Work with Summoner stats and Champion stats
                    StatsCalculations(stats, Match, id, championIds, championsPlayed);
                }
                List<ChampionDto> filteredList = FilterChampionList(championsPlayed, championIds);
                if (filteredList.Count < 3)
                    stats.favoriteChampions = filteredList.GetRange(0, filteredList.Count);
                else
                    stats.favoriteChampions = filteredList.GetRange(0, 3);
                stats.favoriteRoles = roleList;
                stats.gamesPlayed = 10;

                if (stats.deaths != 0)
                    stats.kda = Math.Round(((double)(stats.kills + stats.assists) / stats.deaths), 2);
                else stats.kda = Math.Round((double)(stats.kills + stats.assists), 2);
                for (int i = 0; i < stats.favoriteChampions.Count; i++)
                {
                    if (stats.favoriteChampions[i].deaths != 0)
                        stats.favoriteChampions[i].kda = Math.Round((double)(stats.favoriteChampions[i].kills + stats.favoriteChampions[i].assists)
                        / stats.favoriteChampions[i].deaths, 2);
                    else stats.favoriteChampions[i].kda = Math.Round((double)(stats.favoriteChampions[i].kills + stats.favoriteChampions[i].assists));
                }
            }
            return stats;
        }
        private void StatsCalculations(QuickStatsDto stats, MatchDto Match, int id, List<int> championIds,
            List<ChampionDto> championsPlayed)
        {
            stats.kills += Match.participants[id - 1].stats.kills;
            stats.assists += Match.participants[id - 1].stats.assists;
            stats.deaths += Match.participants[id - 1].stats.deaths;
            if (Match.participants[id - 1].stats.win) stats.wins += 1;
            else stats.loss += 1;
            //--------------------------------------------------------------
            ChampionDto champion = new ChampionDto();
            champion.championId = Match.participants[id - 1].championId;
            champion.kills = Match.participants[id - 1].stats.kills;
            champion.assists = Match.participants[id - 1].stats.assists;
            champion.deaths = Match.participants[id - 1].stats.deaths;
            if (Match.participants[id - 1].stats.win) champion.wins += 1;
            else champion.loss += 1;
            champion.gamesPlayed += 1;
            if (!championIds.Contains(Match.participants[id - 1].championId))
                championIds.Add(Match.participants[id - 1].championId);
            //-----------------------------------------------------------------
            championsPlayed.Add(champion);
        }
        private void CheckForRoles(string lane, List<RoleDto> roleList)
        {
            if (lane != "NONE")
            {
                if (lane == "BOTTOM") AddToRoles(roleList, 0);
                if (lane == "SUPPORT") AddToRoles(roleList, 1);
                if (lane == "JUNGLE") AddToRoles(roleList, 2);
                if (lane == "MID") AddToRoles(roleList, 3);
                if (lane == "TOP") AddToRoles(roleList, 4);
            }
        }
        private List<ChampionDto> FilterChampionList(List<ChampionDto> championsPlayed, List<int> championIds)
        {
            List<ChampionDto> filteredList = new List<ChampionDto>();
            for (int i = 0; i < championIds.Count; i++)
            {
                ChampionDto championDto = new ChampionDto();
                championDto.championId = championIds[i];
                championDto.kills = championsPlayed.Where(champion => champion.championId == championIds[i])
                    .Sum(champion => champion.kills);
                championDto.assists = championsPlayed.Where(champion => champion.championId == championIds[i])
                    .Sum(champion => champion.assists);
                championDto.deaths = championsPlayed.Where(champion => champion.championId == championIds[i])
                    .Sum(champion => champion.deaths);
                championDto.wins = championsPlayed.Where(champion => champion.championId == championIds[i])
                    .Sum(champion => champion.wins);
                championDto.loss = championsPlayed.Where(champion => champion.championId == championIds[i])
                    .Sum(champion => champion.loss);
                championDto.gamesPlayed = championsPlayed.Where(champion => champion.championId == championIds[i])
                    .Sum(champion => champion.gamesPlayed);
                filteredList.Add(championDto);
            }
            filteredList = filteredList.OrderByDescending(o => o.gamesPlayed).ToList();
            return filteredList;
        }

        private void AddToRoles(List<RoleDto> list, int id)
        {
            list[id].gameCount += 1;
        }
        private List<RoleDto> AssignRoles()
        {
            List<RoleDto> roles = new List<RoleDto>();
            RoleDto role1 = new RoleDto();
            RoleDto role2 = new RoleDto();
            RoleDto role3 = new RoleDto();
            RoleDto role4 = new RoleDto();
            RoleDto role5 = new RoleDto();
            role1.role = "BOTTOM"; //id 0
            roles.Add(role1);
            role2.role = "SUPPORT"; //id 1
            roles.Add(role2);
            role3.role = "JUNGLE"; //id 2
            roles.Add(role3);
            role4.role = "MID"; //id 3
            roles.Add(role4);
            role5.role = "TOP"; //id 4
            roles.Add(role5);
            return roles;
        }
        private int GetParticipantById(string accountId, MatchDto Match)
        {
            for (int i = 0; i < 10; i++)
            {
                if (Match.participantIdentities[i].player.accountId.ToString() == accountId)
                    return Match.participantIdentities[i].participantId;
            }
            return 0;
        }

        private int GetParticipantBySummonerName(string SummonerName, MatchDto Match)
        {
            for (int i = 0; i < 10; i++)
            {
                if (Match.participantIdentities[i].player.summonerName.ToString() == SummonerName)
                    return Match.participantIdentities[i].participantId;
            }
            return 0;
        }
    }
}
