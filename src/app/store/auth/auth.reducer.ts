import { AppAction } from "@core/types/redux.type";
import { AuthActionType, AuthState } from "./auth.type";

export default function authReducer(
  state = initialState,
  action: AppAction
): AuthState {
  switch (action.type) {
    case AuthActionType.STORE_AUTH:
      return {
        ...state,
        _id: action.payload?.user?._id,
        username: action.payload?.user?.username,
        role: action.payload?.user?.role,
        jwt: action.payload?.user?.jwt,
      };
    case AuthActionType.CLEAR_AUTH:
      return initialState;
    default:
      return state;
  }
}

const initialState: AuthState = {
  _id: "",
  username: "",
  role: "",
  jwt: "",
};
