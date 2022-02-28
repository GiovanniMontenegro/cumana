export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

export type UserRequest = Omit<User, 'id'>;
