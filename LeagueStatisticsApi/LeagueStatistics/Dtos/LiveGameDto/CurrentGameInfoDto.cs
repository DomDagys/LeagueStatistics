using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.LiveGameDto
{
    public class CurrentGameInfoDto
    {
        public long gameId { get; set; }
        public string gameType { get; set; }
        public long gameStartTime { get; set; }
        public long mapId { get; set; }
        public long gameLength { get; set; }
        public string platformId { get; set; }
        public string gameMode { get; set; }
        public long gameQueueConfigId { get; set; }
        public List<BannedChampionDto> bannedChampions { get; set; }
        public ObserverDto observers { get; set; }
        public List<CurrentGameParticipantDto> participants { get; set; }
    }
}
