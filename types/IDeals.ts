import { IUserAuth } from "./IAuth";
import { IPosts } from "./IPost";
export interface IDeals {
  _id: string;
  product: IPosts;
  offer: IPosts;
  status: any;
  chat: Chat[];
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  text: string;
  user: IUserAuth;
  id: string;
  time: number;
}
