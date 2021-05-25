import {
    GET_VIDEO,
    GET_VIDEOS,
    GET_VIDEO_FAIL,
    GET_VIDEOS_FAIL,
    POST_VIDEO,
    POST_VIDEO_FAIL,
    DELETE_VIDEO_FAIL,
    DELETE_VIDEO, UPDATE_VIDEO, UPDATE_VIDEO_FAIL, CLEAN_VIDEO
} from '../actions/types';

const initialState = {
    videos: [],
    video: {},
    videos_error:'',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_VIDEOS:
            return {
                ...state,
                videos: action.videos,
                videos_error: ''
            };

        case CLEAN_VIDEO:
            return {
                ...state,
                video: {},
            };
    

        case POST_VIDEO:
            return {
                ...state,
                videos: [...state.videos, action.video],
                videos_error: ''
            };

        case GET_VIDEO:
            return {
                ...state,
                video: action.video,
                videos_error: ''
            };
        case UPDATE_VIDEO:
            return {
                ...state,
                videos: state.videos.map((item) => {
                    if (item.id !== action.video.id) {
                        return item
                    }

                    return {
                        ...item,
                        ...action.video
                    }
                }),
                videos_error: ''
            };
        case DELETE_VIDEO:
            return {
                ...state,
                videos: state.videos.filter(item => item.id !== action.video.id),
                videos_error: ''
            };
        case UPDATE_VIDEO_FAIL:
        case DELETE_VIDEO_FAIL:
        case POST_VIDEO_FAIL:
        case GET_VIDEOS_FAIL:
        case GET_VIDEO_FAIL:
            return {
                ...state,
                videos_error: action.error
            };
        default:
            return state;
    }
}
