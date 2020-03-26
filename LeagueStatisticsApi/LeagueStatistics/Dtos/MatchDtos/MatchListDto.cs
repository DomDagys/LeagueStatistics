using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.MatchDtos
{
    public class MatchListDto
    {
        public List<MatchReferenceDto> matches { get; set; }
        public int totalGames { set; get; }
        public int startIndex { set; get; }
        public int endIndex { set; get; }
    }
}
