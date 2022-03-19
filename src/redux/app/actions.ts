import { ReduxAction } from "../type";
import appAction from "./consts";
import { TreeState } from "./reducer";

export type SetTreeStatePayLoad = { treeState: TreeState };
export const setTreeState = (treeState): ReduxAction<SetTreeStatePayLoad> => {
  return {
    type: appAction.SET_TREE_STATE_ACTION,
    payload: { treeState },
  };
};

export const resetTreeState = (): ReduxAction<undefined> => {
  return {
    type: appAction.RESET_TREE_STATE_ACTION,
  };
};
