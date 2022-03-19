import userAction from "./consts";
import { LoginPayLoad } from "./actions";
import { ReduxAction } from "../type";

export type UserInfo = {
  token: string;
  id: number;
  username: string;
  name: string;
  email: string;
  avatar: string;
  refresh: string;
  roles: Array<string>;
};

export type AuthState = {
  userInfo: UserInfo;
  isAuthenticated: boolean;
};

export const defaultState: AuthState = {
  isAuthenticated: false,
  userInfo: {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNRc1YUaPS-oYp4EBQkuQZeYK7Iuf4sVBsgY4pFSfm6jGBZtZ07ol9InV2FHFEe-dvawM&usqp=CAU",
    email: "administration@test.com",
    id: 1,
    refresh: undefined,
    name: "Super Admin",
    token: "1_1645871381555",
    username: "admin",
    roles: undefined,
  },
};

const authReducer = (
  state: AuthState = defaultState,
  action: ReduxAction<any>
): AuthState => {
  const { type: actionType } = action;

  switch (actionType) {
    case userAction.LOGIN_ACTION: {
      const actionPayload = (action as ReduxAction<LoginPayLoad>).payload;
      const { userInfo } = actionPayload;
      return {
        ...state,
        isAuthenticated: true,
        userInfo: {
          ...state.userInfo,
          ...userInfo,
          avatar: userInfo?.avatar
            ? userInfo?.avatar
            : defaultState.userInfo.avatar,
        },
      };
    }
    case userAction.LOGOUT_ACTION: {
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
