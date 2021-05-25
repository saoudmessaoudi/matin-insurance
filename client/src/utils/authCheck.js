import store from "../store";
export default () => store.getState().auth.logged_in;
