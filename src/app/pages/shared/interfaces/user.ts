export interface IUser {
  clientId: number;
  email: string;
  enabled?: boolean;
  firstName: string;
  id: number;
  permissions: ['string'];
  role: string;
  roleId: number;
  surname: string;
  username: string;
}
