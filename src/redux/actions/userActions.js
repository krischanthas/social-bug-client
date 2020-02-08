import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/login", userData)
        .then(res => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem("FBIdToken", FBIdToken);
            axios.defaults.headers.common["Authorization"] = FBIdToken; // each time we send a request with axios it will have this auth header
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/'); // redirect us to the home page
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getUserData = () => dispatch => {
    axios
        .get("/users")
        .then(response => {
            dispatch({
                type: SET_USER,
                payload: response.data
            });
        })
        .catch(err => console.log(err));
};


// const setAuthorizationHeader = (token) => {
//   const FBIdToken = `Bearer ${token}`;
//   localStorage.setItem('FBIdToken', FBIdToken);
//   axios.defaults.headers.common['Authorization'] = FBIdToken;
// };