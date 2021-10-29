import { Profile } from './Profile';

export interface ProfileApiData {
  error?: { message: string };
  profile?: Profile;
}
