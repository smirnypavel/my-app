// import { IUserAuth } from "../auth/authReducer";

import { IModerateState } from "./moderateReducer";

export const getUser = (state: { moderate: IModerateState }) =>
  state.moderate.user;
