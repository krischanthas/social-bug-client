import { SET_SHOUTS, LOADING_DATA, LIKE_SHOUT, UNLIKE_SHOUT } from "../types";
import axios from "axios";

/* Get all shouts */
export const getShouts = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get("/shouts")
        .then(response => {
            dispatch({
                type: SET_SHOUTS,
                payload: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_SHOUTS,
                payload: []
            });
        });
};

/* Like a shout */
export const likeShout = (shoutId) => dispatch => {
      axios.get(`/shout/${shoutId}/like`)
            .then(res => {
                  dispatch({type: LIKE_SHOUT, payload: res.data});
            })
            .catch(err => {
                  console.log(err);
            })
};
/* Unlike a shout*/
export const unlikeShout = (shoutId) => dispatch => {
      axios.get(`/shout/${shoutId}/unlike`)
      .then(res => {
            dispatch({type: UNLIKE_SHOUT, payload: res.data});
      })
      .catch(err => {
            console.log(err);
      })
};