using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.SummonerDtos
{
    public class LeagueEntryDto
    {
        public string leagueId { get; set; }
        public string summonerId { get; set; }
        public string summonerName { get; set; }
        public string queueType { get; set; }
        public string tier { get; set; }
        public string rank { get; set; }
        public int leaguePoints { get; set; }
        public int wins { get; set; }
        public int losses { get; set; }
        public Boolean hotStreak { get; set; }
        public Boolean veteran { get; set; }
        public Boolean freshBlood { get; set; }
        public Boolean inactive { get; set; }
        public MiniSeriesDto miniSeries { get; set; }
    }
}
