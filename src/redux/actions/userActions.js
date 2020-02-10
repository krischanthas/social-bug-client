import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from "../types";
import axios from "axios";

// log in action 
export const loginUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/login", userData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
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

// log out action
export const logOutUser = () => dispatch => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

// get user data
export const getUserData = () => dispatch => {
    dispatch({type: LOADING_USER});
    axios
        .get("/user")
        .then(response => {
            dispatch({
                type: SET_USER,
                payload: response.data
            });
        })
        .catch(err => console.log(err));
};

// sign up user
export const signUpUser = (newUserData, history) => dispatch => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/signup", newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
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

// set auth header
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

// upload profile image action
export const uploadImage = (formData) => dispatch =>{
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
        .then(response => {
            dispatch(getUserData());
        })
        .catch(err => {
            console.log(err);
        })
}

