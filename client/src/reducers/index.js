import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from "./auth";
import stats from "./stats";
import appointments from "./appointments";
import comments from './comments';
import videos from './videos';
import admin from './admin';
import submissions from './submissions';


export default combineReducers({
    auth,
    stats,
    appointments,
    comments,
    videos,
    submissions,
    admin,
    form: formReducer,
})