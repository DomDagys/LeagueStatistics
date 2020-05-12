import { leagueService } from "../_services";

export function procesMatchData(matchData) {
  var match = {
    teamBlue: {
      participants: matchData.slice(0, 5),
    },
    teamRed: {
      participants: matchData.slice(5, 10),
    },
  };
  return match;
}

export function getImageUrl(data, key) {
  for (var i in data) {
    if (data[i].key == key) {
      return (
        "http://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/" +
        i +
        ".png"
      );
    }
  }
  return "";
}

export function getTierUrl(summonerName, region) {
  let arr = [];
  leagueService.getRankedStats(summonerName, region).then((leagueData) => {
    return leagueData.map((x) => arr.push(x));
  });
}
