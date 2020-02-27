using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using LeagueStatistics.Controllers;

namespace LeagueStatistics.Services.RiotAPI
{
    public class GeneralAPI
    {
        //ValuesController Controller = new ValuesController();

        private string Key { get; set; }
        private string Region { get; set; }

        public GeneralAPI(string region)
        {
            Region = region;
            Key = GetKey("Services/RiotAPI/Key.txt");
        }

        protected HttpResponseMessage GET(string URL)
        {
            using (HttpClient client = new HttpClient())
            {
                var result = client.GetAsync(URL);
                result.Wait();

                return result.Result;
            }
        }

        protected string GetKey(string path)
        {
            StreamReader reader = new StreamReader(path);
            return reader.ReadToEnd();
        }

        protected string GetURI(string path)
        {
            return "https://" + Region + ".api.riotgames.com/lol/" + path + "?api_key=" + Key;
        }
    }
}
