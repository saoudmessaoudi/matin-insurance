import {
    GET_INFO,
    GET_INFO_FAIL, UPDATE_INFO, UPDATE_INFO_FAIL
} from '../actions/types';

const initialState = {
    info: {
        id:"",
        key:"",
        address:"",
        phone:"",
        city:"",
        country:"",
        postal_code:"",
    },
    info_error:''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_INFO:
            return {
                ...state,
                info: action.info,
                info_error: ''
            };
        case GET_INFO_FAIL:
            return {
                ...state,
                info_error: action.error
            };
        case UPDATE_INFO:
            return {
                ...state,
                info: action.info,
                info_error: ''
            };
        case UPDATE_INFO_FAIL:
            return {
                ...state,
                info_error: action.error
            };
        default:
            return state;
    }
}
