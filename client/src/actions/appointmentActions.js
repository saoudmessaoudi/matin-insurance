import server from "../api/server";
import {appointments_route} from "../utils/serverRoutes";
import {
    UPDATE_APPOINTMENT,
    UPDATE_APPOINTMENT_FAIL,
    GET_APPOINTMENTS,
    GET_APPOINTMENTS_FAIL,
    CREATE_APPOINTMENT, CREATE_APPOINTMENT_FAIL
} from "./types";
import axios from "axios";

export const getAppointments = () => async dispatch => {
    try{
        const {data} = await server.get(appointments_route, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: GET_APPOINTMENTS, appointments: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_APPOINTMENTS_FAIL, error: 'Server error'});

        dispatch({type: GET_APPOINTMENTS_FAIL, error: e.response.data});
    }
}

export const updateAppointment = (appointment) => async dispatch => {
    try{
        const {data} = await server.put(appointments_route, appointment,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: UPDATE_APPOINTMENT, appointment: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: UPDATE_APPOINTMENT_FAIL, error: 'Server error'});

        dispatch({type: UPDATE_APPOINTMENT_FAIL, error: e.response.data});
    }
}

export const newAppointment = (appointment_data, user_id) => async dispatch => {
    try{
        const req = {
            client_id: user_id,
            client_name: appointment_data.first_name.replace(/\s+/g,'') + " " + appointment_data.last_name.replace(/\s+/g,''),
            client_email: appointment_data.email,
            type: appointment_data.type,
            phone : appointment_data.phone,
            date: appointment_data.selectedDate,
        };
        const {data} = await server.post(appointments_route, req,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        document.dispatchEvent(new CustomEvent('book_appointment', { detail : {success: true} }));
    }catch(e){
        document.dispatchEvent(new CustomEvent('book_appointment', { detail : {success: false} }));
    }
}


