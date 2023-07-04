import { IModerateState } from "./moderateReducer";

export const getUserSelect = (state: { moderate: IModerateState }) =>
  state.moderate.user;
