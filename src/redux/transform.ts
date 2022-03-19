import { createTransform } from "redux-persist";

const userTransform = createTransform(
  // transform state trước khi nó được serialize và lưu
  (inboundState: any) => {
    // convert mySet thành một mảng.
    return { ...inboundState, mySet: [...inboundState.mySet] };
  },

  // transform state đang được phục hồi
  (outboundState) => {
    // convert mySet trở lại thành Set.
    return { ...outboundState, mySet: new Set(outboundState.mySet) };
  },

  // định nghĩa reducer nào sẽ áp dụng transform này.
  { whitelist: ["auth", "app"] }
);

export default userTransform;
