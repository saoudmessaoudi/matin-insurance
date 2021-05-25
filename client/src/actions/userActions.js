import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import {
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_UP,
    SIGN_UP_ERROR,
    SIGN_OUT,
    UPDATE_TOKEN,
    CHANGE_PASS,
    CHANGE_PASS_ERROR, CHANGE_EMAIL_ERROR, CHANGE_EMAIL, CHANGE_AVATAR, CHANGE_AVATAR_ERROR
} from './types';
import {signup_route, user_route} from "../utils/serverRoutes";
import history from "../history";
import server from "../api/server";
import {UPDATE_INFO, UPDATE_INFO_FAIL} from "./types";
import axios from "axios";

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({type: SIGN_OUT});
    history.push('/auth/login');
}

export const login = (formValues) => async dispatch => {
    try{
        const {data} = await server.post(user_route, {email: formValues.email, password : formValues.password});
        localStorage.setItem('jwtToken', data.token);
        setAuthorizationToken(data.token);
        dispatch({type: SIGN_IN, user: jwtDecode(data.token)});
        history.push('/admin/index');
    }catch(e){
        if(!e.response)
            return dispatch({type: SIGN_IN_ERROR, error: 'Server error'});
        dispatch({type: SIGN_IN_ERROR, error: e.response.data});
    }
}

export const singup = (formValues) => async dispatch => {
    try{
        const {data} = await server.post(signup_route,
             {name: formValues.first_name + " " + formValues.last_name,  email: formValues.email, password : formValues.password, profile_img : 'default.jpg'
            , admin : false});
        localStorage.setItem('jwtToken', data.token);
        setAuthorizationToken(data.token);
        dispatch({type: SIGN_UP, user: jwtDecode(data.token)});
        history.push('/auth/login');
        
    }catch(e){
        if(!e.response)
            return dispatch({type: CHANGE_PASS_ERROR, error: 'Server error'});
        dispatch({type: SIGN_UP_ERROR, error: e.response.data});
        document.dispatchEvent(new CustomEvent('signup', { detail : {success: false, message : e.response.data.message} }));
        console.log(e.response);

    }
    console.log(formValues);
}

export const changePass = (formValues) => async (dispatch, getState) => {
    try{
        const id = getState().auth.user.id;
        const {data} = await server.post(user_route + "/change-pass", {id: id, old:formValues.old_password, password : formValues.new_password});

        document.dispatchEvent(new CustomEvent('change_pass', { detail : {success: true} }));
        updateToken(dispatch, data);
    }catch(e){
        document.dispatchEvent(new CustomEvent('change_pass', { detail : {success: false} }));
        if(!e.response)
            return dispatch({type: CHANGE_PASS_ERROR, error: 'Server error'});
        dispatch({type: CHANGE_PASS_ERROR, error: e.response.data});
    }
}

export const changePassByToken = (token, pw) => async () => {
    try{
        await server.post(user_route + "/change-pass-forgot", {token: token, password : pw});
        document.dispatchEvent(new CustomEvent('change_pass_forgot', { detail : {success: true} }));
    }catch(e){
        document.dispatchEvent(new CustomEvent('change_pass_forgot', { detail : {success: false} }));
    }
}

export const changeEmail = (email) => async (dispatch, getState) => {
    try{
        const id = getState().auth.user.id;
        const {data} = await server.post(user_route + "/change-email", {id: id, email : email});
        updateToken(dispatch, data);
        document.dispatchEvent(new CustomEvent('change_email', { detail : {success: true} }));
    }catch(e){
        document.dispatchEvent(new CustomEvent('change_email', { detail : {success: false} }));
        if(!e.response)
            return dispatch({type: CHANGE_EMAIL_ERROR, error: 'Server error'});
        dispatch({type: CHANGE_EMAIL_ERROR, error: e.response.data});

    }
}

export const requestPass = (email) => async () => {
    try{
        await server.get(user_route + "/generate-pass-token/" + email);
        document.dispatchEvent(new CustomEvent('request_pass', { detail : {success: true} }));
    }catch(e){
        document.dispatchEvent(new CustomEvent('request_pass', { detail : {success: false} }));

    }
}

export const checkPassId = (id) => async () => {
    try{
        await server.get(user_route + "/check-pass-id/" + id);
        document.dispatchEvent(new CustomEvent('check_pass_id', { detail : {success: true} }));
    }catch(e){
        document.dispatchEvent(new CustomEvent('check_pass_id', { detail : {success: false} }));

    }
}

export const changeAvatar = (image) => async (dispatch, getState) => {
    try{
        const id = getState().auth.user.id;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("formFile", image);
        const {data} = await server.post(user_route + "/change-avatar", formData);
        updateToken(dispatch, data);
        document.dispatchEvent(new CustomEvent('change_avatar', { detail : {success: true} }));
    }catch(e){
        document.dispatchEvent(new CustomEvent('change_avatar', { detail : {success: false} }));
        if(!e.response)
            return dispatch({type: CHANGE_AVATAR_ERROR, error: 'Server error'});
        dispatch({type: CHANGE_AVATAR_ERROR, error: e.response.data});

    }
}

export const updateToken = (dispatch, data) => {
    localStorage.setItem('jwtToken', data);
    setAuthorizationToken(data);
    dispatch({type: UPDATE_TOKEN, user: jwtDecode(data)});
}

export const updateUserInfo = (info) => async (dispatch, getState) => {
    try{
        const id = getState().auth.user.id;
        const model = {
            id : id,
            name : info.fname + " " + info.lname
        }
        const {data} = await server.post(user_route + "/change-name", model,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        document.dispatchEvent(new CustomEvent('change_name', { detail : {success: true} }));
        updateToken(dispatch, data);
    }catch(e){
        document.dispatchEvent(new CustomEvent('change_name', { detail : {success: false} }));
        if(!e.response)
            return dispatch({type: UPDATE_INFO_FAIL, error: 'Server error'});

        dispatch({type: UPDATE_INFO_FAIL, error: e.response.data});
    }
}



