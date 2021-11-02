import { Profile } from './Profile';

export interface User {
  profile?: Profile;
  email: string;
  username: string;
  isSitter?: boolean;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
