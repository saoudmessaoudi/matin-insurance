import {
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_UP,
    SIGN_UP_ERROR,
    SIGN_OUT,
    UPDATE_TOKEN,
    CHANGE_PASS,
    CHANGE_PASS_ERROR, CHANGE_EMAIL, CHANGE_EMAIL_ERROR, CHANGE_AVATAR_ERROR, CHANGE_AVATAR
} from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    logged_in: false,
    sign_in_error:'',
    sign_up_error:'',
    change_pass_message: '',
    change_pass_error: '',
    change_email_error: '',
    change_avatar_error: '',
    user: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                logged_in: !isEmpty(action.user),
                user: action.user,
                sign_in_error: ''
            };
        case SIGN_IN_ERROR:
            return {
                ...state,
                sign_in_error: action.error
            };
        case SIGN_UP:
            return {
                ...state,
                logged_in: !isEmpty(action.user),
                user: action.user,
                sign_up_error: ''
            };  
        case SIGN_UP_ERROR:
            return {
                ...state,
                sign_up_error: action.error
            };
        case SIGN_OUT:
            return {
                ...state,
                logged_in: false,
                sign_in_error: '',
                user: {}
            }
        case UPDATE_TOKEN:
            return {
                ...state,
                user: action.user
            }
        case CHANGE_PASS:
            return {
                ...state,
                change_pass_message: 'changed'
            };
        case CHANGE_PASS_ERROR:
            return {
                ...state,
                change_pass_error: action.error
            };
        case CHANGE_EMAIL:
            return {
                ...state,
                user: {...state.user, email: action.email}
            };
        case CHANGE_EMAIL_ERROR:
            return {
                ...state,
                change_email_error: action.error
            };
        case CHANGE_AVATAR:
            return {
                ...state,
                user: {...state.user, profile_img: action.image}
            };
        case CHANGE_AVATAR_ERROR:
            return {
                ...state,
                change_avatar_error: action.error
            };
        default:
            return state;
    }
}
