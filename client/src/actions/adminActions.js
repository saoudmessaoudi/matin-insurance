import server from "../api/server";
import {admin_info_route} from "../utils/serverRoutes";
import {UPDATE_INFO, UPDATE_INFO_FAIL, GET_INFO, GET_INFO_FAIL} from "./types";
import axios from "axios";

export const getAdminInfo = () => async dispatch => {
    try{
        const {data} = await server.get(admin_info_route, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: GET_INFO, info: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_INFO_FAIL, error: 'Server error'});

        dispatch({type: GET_INFO_FAIL, error: e.response.data});
    }
}

export const updateAdminInfo = (info) => async (dispatch, getState) => {
    try{
        const this_info = getState().admin.info;
        const model = {
            ...this_info,
            address : info.address,
            city : info.city,
            country : info.country,
            postal_code : info.postal_code,
            phone : info.phone
        }
        const {data} = await server.put(admin_info_route, model,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        document.dispatchEvent(new CustomEvent('change_contact', { detail : {success: true} }));
        dispatch({type: UPDATE_INFO, info: data});
    }catch(e){
        document.dispatchEvent(new CustomEvent('change_contact', { detail : {success: false} }));
        if(!e.response)
            return dispatch({type: UPDATE_INFO_FAIL, error: 'Server error'});

        dispatch({type: UPDATE_INFO_FAIL, error: e.response.data});
    }
}

