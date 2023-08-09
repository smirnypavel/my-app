// import { IUserAuth } from "../auth/authReducer";
import { IDeals } from "../../types/IDeals";

export const getDeal = (state: { deal: { deal: IDeals } }) => state.deal.deal;
