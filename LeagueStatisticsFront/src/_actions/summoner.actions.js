import { summonerConstants } from "../_constants"
import { summonerService } from "../_services"
import { alertActions } from "./";

export const summonerActions = {
    getSummonerData
}

function getSummonerData(summonerName, region) {
    return dispatch => {
        summonerService.getSummonerData(summonerName, region).then(
            summonerData => {
                dispatch(success(summonerData));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    }

    function success(summonerData) {
        return { type: summonerConstants.GET_SUMMONER_SUCCESS, summonerData };
    }
    function failure(error) {
        return { type: summonerConstants.GET_SUMMONER_FAILURE, error };
    }
}