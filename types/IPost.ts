export interface IOwner {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarURL: string;
  location: string;
}
export interface ToExchange {
  user: User2;
  id: string;
  agree: any;
  data: Data;
  _id: string;
}

export interface User2 {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarURL: string;
  location: string;
}

export interface Data {
  id: string;
  title: string;
  description: string;
  img: string;
  price: number;
}
export interface IComment {
  text: string;
  id: string;
  user: User;
  answer: Answer[];
}
export interface Answer {
  text: string;
  id: string;
  user: User;
}
export interface User {
  firstName: string;
  lastName: string;
  avatarURL: string;
  isOnline: boolean;
}

export interface IPosts {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  verify: string;
  views?: number;
  favorite: string[];
  createdAt: string; // Add the createdAt property here
  updatedAt?: string;
  owner: IOwner;
  comments?: IComment[];
  toExchange: ToExchange[];
  isActive?: boolean;
  location: string;
}

export interface IPostState {
  post: IPosts;
  isLoading: boolean;
  error: string | any;
}
