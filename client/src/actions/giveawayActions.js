import server from "../api/server";
import {giveaway_route} from "../utils/serverRoutes";
import {
    GET_SUBMISSION,
    GET_SUBMISSION_FAIL,
    DELETE_SUBMISSION,
    DELETE_SUBMISSION_FAIL,
    POST_SUBMISSION,
    POST_SUBMISSION_FAIL, GET_SUBMISSIONS, GET_SUBMISSIONS_FAIL
} from "./types";
import axios from "axios";

export const getSubmissions = () => async dispatch => {
    try{
        const {data} = await server.get(giveaway_route, {
            headers: {
                'Authorization': `${axios.defaults.headers.common['Authorization']}`
            }
        });
        dispatch({type: GET_SUBMISSIONS, submissions: data});
    }catch(e){
        if(!e.response){
            return dispatch({type: GET_SUBMISSIONS_FAIL, error: 'Server error'});
        }
        dispatch({type: GET_SUBMISSIONS_FAIL, error: e.response.data});
    }
}
export const getSubmission = (submission_id) => async dispatch => {
    try{
        const {data} = await server.get(giveaway_route + `/${submission_id}`, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: GET_SUBMISSION, submission: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_SUBMISSION_FAIL, error: 'Server error'});
        dispatch({type: GET_SUBMISSION_FAIL, error: "Not found"});
    }
}

export const deleteSubmission = (submission_id) => async dispatch => {
    try{
        const {data} = await server.delete(giveaway_route + `/${submission_id}`, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: DELETE_SUBMISSION, submission: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: DELETE_SUBMISSION_FAIL, error: 'Server error'});
        dispatch({type: DELETE_SUBMISSION_FAIL, error: "Not found"});
    }
}

export const newSubmission = (giveaway_data) => async dispatch => {
    try{
        const req = {
            client_id: giveaway_data.first_name+giveaway_data.last_name,
            name: giveaway_data.first_name.replace(/\s+/g,'') + " " + giveaway_data.last_name.replace(/\s+/g,''),
            email: giveaway_data.email,
            phone: giveaway_data.phone,
            answer1: giveaway_data.ans1,
            answer2: giveaway_data.ans2,
            answer3: giveaway_data.ans3,
            answer4: giveaway_data.ans4
        };
        const {data} = await server.post(giveaway_route, req,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        document.dispatchEvent(new CustomEvent('post_submission', { detail : {success: true} }));
    }catch(e){
        document.dispatchEvent(new CustomEvent('post_submission', { detail : {success: false} }));
    }
}