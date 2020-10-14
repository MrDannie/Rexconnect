export interface IWrapper<T> {
  content: T[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
