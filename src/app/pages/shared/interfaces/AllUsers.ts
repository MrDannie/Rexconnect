import { IUser } from './User';

export interface AllUsers {
  content: IUser[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
