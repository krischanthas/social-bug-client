import {
      SET_SHOUTS,
      LIKE_SHOUT,
      UNLIKE_SHOUT,
      LOADING_DATA,
      DELETE_SHOUT,
      POST_SHOUT,
      SET_SHOUT,
      SUBMIT_COMMENT
} from "../types";

const initialState = {
      shouts: [],
      shout: {},
      loading: false
};

export default function(state = initialState, action) {
      switch (action.type) {
            case LOADING_DATA:
                  return {
                        ...state,
                        loading: true
                  };
            case SET_SHOUTS:
                  return {
                        ...state,
                        shouts: action.payload,
                        loading: false
                  };
            case SET_SHOUT:
                  return {
                        ...state,
                        shout: action.payload
                  };
            case LIKE_SHOUT:
            case UNLIKE_SHOUT:
                  let index = state.shouts.findIndex(
                        shout => shout.shoutId === action.payload.shoutId
                  );
                  state.shouts[index] = action.payload;
                  // if the specific shout dialog is open check with store then get details for that post
                  if (state.shout.shoutId === action.payload.shoutId) {
                        state.shout = action.payload;
                  }
                  return {
                        ...state,
                  };
            case SUBMIT_COMMENT:
                  return {
                        ...state,
                        shout: {
                              ...state.shout,
                              commentCount: state.shout.commentCount+1,
                              comment: [action.payload, ...state.shout.comment]
                        }
                  };
            case DELETE_SHOUT:
                  let deleteThisIndex = state.shouts.findIndex(
                        shout => shout.shoutId === action.payload
                  );
                  state.shouts.splice(deleteThisIndex, 1);
                  return {
                        ...state
                  };
            case POST_SHOUT:
                  return {
                        ...state,
                        shouts: [action.payload, ...state.shouts]
                  };
            default:
                  return state;
      }
}
