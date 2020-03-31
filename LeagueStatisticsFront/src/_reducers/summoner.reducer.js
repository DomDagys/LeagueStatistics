import { summonerConstants } from '../_constants/'

export function summonerReducer(state = {}, action) {
    switch (action.type) {
        case summonerConstants.GET_SUMMONER_SUCCESS:
            return {
                summonerData: action.summonerData
            };
        case summonerConstants.GET_SUMMONER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}