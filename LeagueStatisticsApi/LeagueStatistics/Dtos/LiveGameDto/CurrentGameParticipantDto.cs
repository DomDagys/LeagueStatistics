using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.LiveGameDto
{
    public class CurrentGameParticipantDto
    {
        public long championId { get; set; }
        public long profileIconId { get; set; }
        public Boolean bot { get; set; }
        public long teamId { get; set; }
        public string summonerName { get; set; }
        public string summonerId { get; set; }
        public long spell1Id { get; set; }
        public long spell2Id { get; set; }
        public PerksDto perks { get; set; }
        public List<GameCustomizationObjectDto> gameCustomizationObjects { get; set; }
    }
}
