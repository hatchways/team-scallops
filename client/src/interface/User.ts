import { Profile } from './Profile';

export interface User {
  profile?: Profile;
  _id?: string;
  id?: string;
  email: string;
  username: string;
  isSitter?: boolean;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
