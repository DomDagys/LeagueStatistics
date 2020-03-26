using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.MatchDtos
{
    public class ParticipantIdentityDto
    {
        public int participantId { get; set; }
        public PlayerDto player { get; set; }
    }
}
