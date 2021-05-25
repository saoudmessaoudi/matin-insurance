import {
    ADD_COMMENT, ADD_COMMENT_FAIL,
    DELETE_COMMENT,
    DELETE_COMMENT_FAIL,
    GET_COMMENTS,
    GET_COMMENTS_FAIL, GET_VIDEO_COMMENTS, GET_VIDEO_COMMENTS_FAIL,
    UPDATE_COMMENT, UPDATE_COMMENT_FAIL
} from '../actions/types';

const initialState = {
    comments: [],
    comments_error:''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.comments,
                comments_error: ''
            };
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: state.comments.map((item) => {
                    if (item.id !== action.comment.id) {
                        return item
                    }

                    return {
                        ...item,
                        ...action.comment
                    }
                }),
                comments_error: ''
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments:[...state.comments, action.comment],
                comments_error: ''
            };
        case GET_VIDEO_COMMENTS:
            return {
                ...state,
                comments: action.comments,
                comments_error: ''
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(item => item.id !== action.comment.id),
                comments_error: ''
            };
        case ADD_COMMENT_FAIL:
        case GET_VIDEO_COMMENTS_FAIL:
        case UPDATE_COMMENT_FAIL:
        case DELETE_COMMENT_FAIL:
        case GET_COMMENTS_FAIL:
            return {
                ...state,
                comments_error: action.error
            };

        default:
            return state;
    }
}
