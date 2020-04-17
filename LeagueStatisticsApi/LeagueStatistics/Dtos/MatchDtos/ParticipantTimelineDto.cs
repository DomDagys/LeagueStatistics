using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.MatchDtos
{
    public class ParticipantTimelineDto
    {
        public int participantId { get; set; }
        public string role { get; set; }
        public string lane { get; set; }
    }
}
