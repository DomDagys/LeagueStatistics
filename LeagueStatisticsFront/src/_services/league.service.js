import config from "config";
//import regeneratorRuntime from "regenerator-runtime";

export const leagueService = {
    getRankedStats
}

function getRankedStats(summonerName, region) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }

    return fetch(`${config.apiUrl}/api/League?region=${region}&summonerName=${summonerName}`, requestOptions)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = JSON.parse(text);
        //console.log(data);
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