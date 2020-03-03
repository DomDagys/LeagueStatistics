using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeagueStatistics.Dtos.SummonerDtos;
using LeagueStatistics.Services.Interfaces;
using Newtonsoft;
using Newtonsoft.Json.Linq;

namespace LeagueStatistics.Services.RiotAPI
{
    public class Summoner_V4Service : GeneralAPI, ISummoner_V4Service
    {
        public Summoner_V4Service()
        {

        }

        public SummonerDto GetSummonerByName(string SummonerName, string region)
        {
            string path = "summoner/v4/summoners/by-name/" + SummonerName;

            var response = GET(GetURI(path, region));
            string content = response.Content.ReadAsStringAsync().Result;

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<SummonerDto>(content);
            }
            else
            {
                return null;
            }
        }
    }
}
