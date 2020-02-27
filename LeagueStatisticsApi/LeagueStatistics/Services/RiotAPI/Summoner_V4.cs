using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeagueStatistics.Dtos.UserDtos;
using Newtonsoft;
using Newtonsoft.Json.Linq;

namespace LeagueStatistics.Services.RiotAPI
{
    public class Summoner_V4 : GeneralAPI
    {
        public Summoner_V4(string region) : base(region)
        {

        }

        public SummonerDto GetSummonerByName(string SummonerName)
        {
            string path = "summoner/v4/summoners/by-name/" + SummonerName;

            var response = GET(GetURI(path));
            string content = response.Content.ReadAsStringAsync().Result;

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                JToken token = JObject.Parse(content);

                SummonerDto summoner = new SummonerDto();
                summoner.ProfileIconID = (int)token.SelectToken("profileIconId");
                summoner.SummonerName = (string)token.SelectToken("name");
                summoner.SummonerLevel = (long)token.SelectToken("summonerLevel");
                return summoner;
            }
            else
            {
                return null;
            }
        }
    }
}
