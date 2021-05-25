import {GET_STATS, GET_STATS_FAIL} from '../actions/types';

const initialState = {
    stats: [],
    stat_error:''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_STATS:
            return {
                ...state,
                stats: action.stats,
                stat_error: ''
            };
        case GET_STATS_FAIL:
            return {
                ...state,
                stat_error: action.error
            };

        default:
            return state;
    }
}
