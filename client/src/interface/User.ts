export interface User {
  email: string;
  username: string;
  isSitter?: boolean;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
