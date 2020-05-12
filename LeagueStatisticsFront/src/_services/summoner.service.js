import config from "config";

export const summonerService = {
    getSummonerData,
    getChampionMastery
}

function getSummonerData(summonerName, region) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };

    return fetch(`${config.apiUrl}/api/Summoner?region=${region}&summonerName=${summonerName}`, requestOptions)
        .then(handleResponse);
}

function getChampionMastery(summonerId, region) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };

    return fetch(`${config.apiUrl}/api/ChampionMastery?summonerId=${summonerId}&region=${region}`)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                location.reload(true);
            }

            //localStorage.setItem("summonerName", "");
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}