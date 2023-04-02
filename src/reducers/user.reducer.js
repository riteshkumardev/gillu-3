import { userConstants } from "../actions/constants";

const intiState = {
  users: [],
  userName: "",
  chatStatus: false,
  open: false,
  conversations: [],
};

export default (state = intiState, action) => {
  switch (action.type) {
    case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
      break;
    case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;
    case userConstants.GET_REALTIME_MESSAGES:
      state = {
        ...state,
        conversations: action.payload.conversations,
      };
      break;
    case `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`:
      state = {
        ...state,
        conversations: [],
      };
      break;
    case userConstants.SET_USER_NAME:
      state = {
        ...state,
        userName: action.payload,
      };
      break;
    case userConstants.SET_CHAT_START_STATUS:
      state = {
        ...state,
        chatStatus: action.payload,
      };
      break;
    case userConstants.SET_OPEN:
      console.log(action.payload, "action.payload");
      state = {
        ...state,
        open: action.payload,
      };
      break;
  }

  return state;
};
