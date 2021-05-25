import axios from 'axios';
import {base_url} from "../utils/serverRoutes";

export default axios.create({
    baseURL: base_url
})