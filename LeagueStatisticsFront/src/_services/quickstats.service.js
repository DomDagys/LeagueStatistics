import config from "config";
//import regeneratorRuntime from "regenerator-runtime";

export const quickstatsService = {
    getStatistics
}

function getStatistics(summonerName, region) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }

    return fetch(`${config.apiUrl}/api/QuickStats?region=${region}&summonerName=${summonerName}`, requestOptions)
        .then(handleResponse);
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