import config from "config";

export const matchService = {
  getMatches,
  getLiveGame,
};

function getMatches(summonerName, region, endIndex, beginIndex) {
  const url = `${config.apiUrl}/api/Match?summonerName=${summonerName}&region=${region}&endIndex=${endIndex}&beginIndex=${beginIndex}`;
  const promise = fetch(url);
  return promise;
}

function getLiveGame(summonerId, region) {
  const url = `${config.apiUrl}/api/LiveGame?summonerId=${summonerId}&region=${region}`;
  const promise = fetch(url);
  return promise;
}
