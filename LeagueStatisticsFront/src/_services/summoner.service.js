import config from "config";

export const summonerService = {
    getSummonerData
}

function getSummonerData(summonerName, region) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region, summonerName })
    };

    return fetch(`${config.apiUrl}/api/Summoner`, requestOptions)
        .then(handleResponse)
        .then(summonerData => {
            localStorage.setItem("summonerName", summonerData.name);

            return summonerData;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            if (response.status === 500) {
                console.log("500 error response");
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}