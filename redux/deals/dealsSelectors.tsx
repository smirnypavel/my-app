// import { IUserAuth } from "../auth/authReducer";
import { IDeals } from "../../types/IDeals";

export const getDeal = (state: { deal: { deal: IDeals } }) => state.deal.deal;
export const getOwnerProductStatus = (state: { deal: { deal: IDeals } }) =>
  state.deal.deal.productStatus;
export const getOfferProductStatus = (state: { deal: { deal: IDeals } }) =>
  state.deal.deal.offerStatus;
