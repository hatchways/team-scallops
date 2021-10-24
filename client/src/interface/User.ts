export interface User {
  _id?: string;
  email: string;
  username: string;
  isSitter?: boolean;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
