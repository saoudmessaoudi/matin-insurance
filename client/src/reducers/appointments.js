import {
    UPDATE_APPOINTMENT,
    UPDATE_APPOINTMENT_FAIL,
    GET_APPOINTMENTS,
    GET_APPOINTMENTS_FAIL
} from '../actions/types';

const initialState = {
    appointments: [],
    appointments_error:''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_APPOINTMENTS:
            return {
                ...state,
                appointments: action.appointments,
                appointments_error: ''
            };
        case UPDATE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.map((item) => {
                    if (item.id !== action.appointment.id) {
                        return item
                    }

                    return {
                        ...item,
                        ...action.appointment
                    }
                }),
                appointments_error: ''
            };
        case GET_APPOINTMENTS_FAIL:
        case UPDATE_APPOINTMENT_FAIL:
            return {
                ...state,
                appointments_error: action.error
            };
        default:
            return state;
    }
}
