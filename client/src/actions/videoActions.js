import server from "../api/server";
import {videos_route} from "../utils/serverRoutes";
import {
    GET_VIDEOS,
    GET_VIDEOS_FAIL,
    GET_VIDEO,
    GET_VIDEO_FAIL,
    POST_VIDEO,
    POST_VIDEO_FAIL,
    DELETE_VIDEO,
    DELETE_VIDEO_FAIL, UPDATE_VIDEO, UPDATE_VIDEO_FAIL, CLEAN_VIDEO,
} from "./types";
import axios from "axios";

export const getVideo = (video_id) => async dispatch => {
    try{
        const {data} = await server.get(videos_route + `/${video_id}`, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: GET_VIDEO, video: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_VIDEO_FAIL, error: 'Server error'});
        dispatch({type: GET_VIDEO_FAIL, error: "Not found"});
    }
}

export const getVideos = () => async dispatch => {
    try{
        const {data} = await server.get(videos_route, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: GET_VIDEOS, videos: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_VIDEOS_FAIL, error: 'Server error'});
        dispatch({type: GET_VIDEOS_FAIL, error: e.response.data});
    }
}

export const addVideo = (video) => async dispatch => {
    debugger;
    try{
        const {data} = await server.post(videos_route, {
            video_title: video.video_title,
            video_url:video.video_url
        }, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: POST_VIDEO, video: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: POST_VIDEO_FAIL, error: 'Server error'});
        dispatch({type: POST_VIDEO_FAIL, error: e.response.data});
    }
}

export const updateVideo = (video) => async dispatch => {
    console.log(video)
    try{
        const {data} = await server.put(videos_route, video,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: UPDATE_VIDEO, video: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: UPDATE_VIDEO_FAIL, error: 'Server error'});

        dispatch({type: UPDATE_VIDEO_FAIL, error: e.response.data});
    }
}

export const deleteVideo = (video) => async dispatch => {
    console.log(video)
    try{
        await server.delete(videos_route+`/${video.id}`, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: DELETE_VIDEO, video: video});
    }catch(e){
        if(!e.response)
            return dispatch({type: DELETE_VIDEO_FAIL, error: 'Server error'});

        dispatch({type: DELETE_VIDEO_FAIL, error: e.response.data});
    }
}

export const cleanVideo = () => dispatch => {
   
        dispatch({type: CLEAN_VIDEO});
    
}


