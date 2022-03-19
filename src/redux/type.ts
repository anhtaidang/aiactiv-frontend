export type ReduxAction<PayloadType> = {
  type: string;
  payload?: PayloadType;
};
