import {
      SET_SHOUTS,
      LOADING_DATA,
      LIKE_SHOUT,
      UNLIKE_SHOUT,
      DELETE_SHOUT,
      POST_SHOUT,
      SET_ERRORS,
      LOADING_UI,
      CLEAR_ERRORS,
      SET_SHOUT,
      STOP_LOADING_UI
} from "../types";
import axios from "axios";

/* Get all shouts */
export const getShouts = () => dispatch => {
      dispatch({ type: LOADING_DATA });
      axios.get("/shouts")
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
/* Get an individual Shout post data */
export const getShout = shoutId => dispatch => {
      dispatch({ type: LOADING_UI });
      axios.get(`/shouts/${shoutId}`).then(response => {
            dispatch({
                  type: SET_SHOUT,
                  payload: response.data
            });
            dispatch({ type: STOP_LOADING_UI });
      })
      .catch(err => {
            console.log(err);
      });
};
/* Post a shout */
export const postShout = newShout => dispatch => {
      dispatch({ type: LOADING_UI });
      axios.post("/shout", newShout)
            .then(res => {
                  dispatch({
                        type: POST_SHOUT,
                        payload: res.data
                  });
                  dispatch({ type: CLEAR_ERRORS });
            })
            .catch(err => {
                  dispatch({ type: SET_ERRORS, payload: err.response.data });
            });
};

/* Like a shout */
export const likeShout = shoutId => dispatch => {
      axios.get(`/shout/${shoutId}/like`)
            .then(res => {
                  dispatch({ type: LIKE_SHOUT, payload: res.data });
            })
            .catch(err => {
                  console.log(err);
            });
};
/* Unlike a shout*/
export const unlikeShout = shoutId => dispatch => {
      axios.get(`/shout/${shoutId}/unlike`)
            .then(res => {
                  dispatch({ type: UNLIKE_SHOUT, payload: res.data });
            })
            .catch(err => {
                  console.log(err);
            });
};

/* delete a shout */
export const deleteShout = shoutId => dispatch => {
      axios.delete(`/shout/${shoutId}`)
            .then(() => {
                  dispatch({
                        type: DELETE_SHOUT,
                        payload: shoutId
                  });
            })
            .catch(err => {
                  console.log(err);
            });
};

/* clear errors */
export const clearErrors = () => dispatch => {
      dispatch({ type: CLEAR_ERRORS });
};
