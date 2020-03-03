using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.SummonerDtos
{
    public class SummonerDto
    {
        public int profileIconId { get; set; }
        public string name { get; set; }
        public string puuid { get; set; } //Encrypted PUUID
        public long summonerLevel { get; set; }
        public long revisionDate { get; set; }
        public string id { get; set; } //Enctrypted summoner ID
        public string accountId { get; set; } //Encrypted account ID
    }
}
