import { ReduxAction } from "../type";
import userAction from "./consts";
import { UserInfo } from "./reducer";

export type LoginPayLoad = { userInfo: UserInfo };
export const logIn = (userInfo): ReduxAction<LoginPayLoad> => {
  return {
    type: userAction.LOGIN_ACTION,
    payload: { userInfo },
  };
};

export const logOut = (): ReduxAction<undefined> => {
  return {
    type: userAction.LOGOUT_ACTION,
  };
};
