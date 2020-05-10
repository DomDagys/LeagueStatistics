import config from "config";

export const matchService = {
    getMatches,
    getRankedChampions
}

function getRankedChampions(summonerName, region, queueId) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }

    return fetch(`${config.apiUrl}/api/Match/FavoriteChampions?region=${region}&summonerName=${summonerName}&queueID=${queueId}`)
        .then(handleResponse);
}

function getMatches(summonerName, region, endIndex, beginIndex) {
    const url = `${config.apiUrl}/api/Match?summonerName=${summonerName}&region=${region}&endIndex=${endIndex}&beginIndex=${beginIndex}`;
    const promise = fetch(url);
    return promise;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}