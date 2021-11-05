export interface User {
  _id?: string;
  id?: string;
  email: string;
  username: string;
  isSitter?: boolean;
  tutorialDone?: boolean;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
