import server from "../api/server";
import {comments_route} from "../utils/serverRoutes";
import {
    ADD_COMMENT,
    ADD_COMMENT_FAIL,
    DELETE_COMMENT,
    DELETE_COMMENT_FAIL,
    GET_COMMENTS,
    GET_COMMENTS_FAIL,
    GET_VIDEO_COMMENTS, GET_VIDEO_COMMENTS_FAIL,
    UPDATE_COMMENT,
    UPDATE_COMMENT_FAIL
} from "./types";
import axios from "axios";

export const getComments = (video_id) => async dispatch => {
    try{
        const {data} = await server.get(comments_route + `/by-video/${video_id}`);
        dispatch({type: GET_VIDEO_COMMENTS, comments: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_VIDEO_COMMENTS_FAIL, error: 'Server error'});
        dispatch({type: GET_VIDEO_COMMENTS_FAIL, error: e.response.data});
    }
}

export const getAllComments = () => async dispatch => {
    try{
        const {data} = await server.get(comments_route);
        dispatch({type: GET_COMMENTS, comments: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_COMMENTS_FAIL, error: 'Server error'});
        dispatch({type: GET_COMMENTS_FAIL, error: e.response.data});
    }
}

export const updateComment = (comment) => async dispatch => {
    try{
        const {data} = await server.put(comments_route, comment,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: UPDATE_COMMENT, comment: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: UPDATE_COMMENT_FAIL, error: 'Server error'});

        dispatch({type: UPDATE_COMMENT_FAIL, error: e.response.data});
    }
}

export const addComment = (comment, user, video) => async dispatch => {
    try{
        const req = {
            user_id: user.id,
            user_name: user.name,
            user_avatar: user.profile_img,
            comment_text: comment,
            status: 0,
            date: new Date(),
            video_id: video.id,
            video_title:video.video_title
        };
        const {data} = await server.post(comments_route, req,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        document.dispatchEvent(new CustomEvent('post_comment', { detail : {success: true} }));
        dispatch({type: ADD_COMMENT, comment: data});
    }catch(e){
        document.dispatchEvent(new CustomEvent('post_comment', { detail : {success: false} }));
        if(!e.response)
            return dispatch({type: ADD_COMMENT_FAIL, error: 'Server error'});

        dispatch({type: ADD_COMMENT_FAIL, error: e.response.data});
    }
}

export const deleteComment = (comment) => async dispatch => {
    try{
        await server.delete(comments_route+`/${comment.id}`, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: DELETE_COMMENT, comment: comment});
    }catch(e){
        if(!e.response)
            return dispatch({type: DELETE_COMMENT_FAIL, error: 'Server error'});

        dispatch({type: DELETE_COMMENT_FAIL, error: e.response.data});
    }
}