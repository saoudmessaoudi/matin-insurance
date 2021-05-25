import {
    GET_SUBMISSION,
    GET_SUBMISSIONS,
    GET_SUBMISSION_FAIL,
    GET_SUBMISSIONS_FAIL,
    DELETE_SUBMISSION,
    DELETE_SUBMISSION_FAIL,
    POST_SUBMISSION,
    POST_SUBMISSION_FAIL
} from '../actions/types';

const initialState = {
    submissions: [],
    submission: {},
    submissions_error:'',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_SUBMISSIONS:
            return {
                ...state,
                submissions: action.submissions,
                submissions_error: ''
            };


        case POST_SUBMISSION:
            return {
                ...state,
                submissions: [...state.submissions, action.submission],
                submissions_error: ''
            };

        case GET_SUBMISSION:
            return {
                ...state,
                submission: action.submission,
                submissions_error: ''
            };

        case DELETE_SUBMISSION:
            return {
                ...state,
                submissions: state.submissions.filter(item => item.id !== action.submission.id),
                submissions_error: ''
            };
       
 
        case POST_SUBMISSION_FAIL:
        case GET_SUBMISSIONS_FAIL:
        case DELETE_SUBMISSION_FAIL:
        case GET_SUBMISSION_FAIL:
            return {
                ...state,
                submissions_error: action.error
            };
        default:
            return state;
    }
}
