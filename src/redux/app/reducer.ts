import { ReduxAction } from "../type";
import appAction from "~/redux/app/consts";
import { SetTreeStatePayLoad } from "~/redux/app/actions";

export type TreeState = {
  selectedKeys?: string[];
  expandedKeys?: string[];
};

export type AppState = {
  isDisplayMessageApiError: boolean;
  treeState: TreeState;
};

const defaultTreeState = { selectedKeys: [], expandedKeys: [] };

export const defaultState: AppState = {
  isDisplayMessageApiError: false,
  treeState: defaultTreeState,
};

const appReducer = (
  state: AppState = defaultState,
  action: ReduxAction<any>
): AppState => {
  const { type: actionType } = action;

  switch (actionType) {
    case appAction.SET_TREE_STATE_ACTION: {
      const { treeState = {} } = (action as ReduxAction<SetTreeStatePayLoad>)
        .payload;
      return {
        ...state,
        treeState: {
          ...state.treeState,
          ...treeState,
        },
      };
    }
    case appAction.RESET_TREE_STATE_ACTION: {
      return {
        ...state,
        treeState: {
          ...defaultTreeState,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
