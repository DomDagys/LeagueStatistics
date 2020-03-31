using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.MatchDtos
{
    public class MatchDto
    {
        public long gameId { get; set; }
        public int queueId { get; set; }
        public string gameType { get; set; }
        public long gameDuration { get; set; }
        public string platformId { get; set; }
        public int seasonId { get; set; }
        public string gameMode { get; set; }
        public List<ParticipantIdentityDto> participantIdentities { get; set; }
        public List<TeamStatsDto> teams { get; set; }
        public List<ParticipantDto> participants { get; set; }
    }
}
