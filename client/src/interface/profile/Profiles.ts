import { Profile } from './Profile';

export interface SearchProfilesApiData {
  profiles?: Profile[];
  error?: { message: string };
}

export interface ProfilesApiDataSuccess {
  profiles?: Profile[];
}
