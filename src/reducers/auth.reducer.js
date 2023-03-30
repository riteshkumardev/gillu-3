import { authConstanst } from "../actions/constants";

const initState = {
  firstName: "",
  lastName: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null,
  errorData: false,
  isLoading: false,
  REGerrorData: false,
};

export default (state = initState, action) => {
  console.log(action);

  switch (action.type) {
    case `${authConstanst.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case `${authConstanst.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
      break;
    case `${authConstanst.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      };
      break;
    case `${authConstanst.USER_LOGOUT}_REQUEST`:
      state = {
        ...state,
        isLoading: true,
      };
      break;
    case `${authConstanst.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initState,
        isLoading: false,
      };
      break;
    case `${authConstanst.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        isLoading: false,
      };
      break;
    case `${authConstanst.USER_CATCH_ERROR}_CATCH_ERROR`:
      state = {
        ...state,
        errorData: action.payload,
        authenticating: false,
      };
      break;
    case `${authConstanst.USER_REGISTER_CATCH}_CATCH_FAILURE`:
      state = {
        ...state,
        REGerrorData: action.payload,
        authenticating: false,
      };
      break;
    case `${authConstanst.USER_LOGIN_CATCH}_CATCH_FAILURE`:
      state = {
        ...state,
        errorData: action.payload,
        authenticating: false,
      };
      break;
  }

  return state;
};
