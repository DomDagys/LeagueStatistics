import config from "config";

export const matchService = {
    getMatches
}

function getMatches(summonerName, region, endIndex, beginIndex){
    const url = `${config.apiUrl}/api/Match?summonerName=${summonerName}&region=${region}&endIndex=${endIndex}&beginIndex=${beginIndex}`;
    const promise = fetch(url);
    return promise;
}