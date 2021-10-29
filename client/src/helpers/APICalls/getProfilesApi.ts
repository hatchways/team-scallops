import { ProfileApiData } from '../../interface/profile/ProfileApiData';
import { SearchProfilesApiData } from '../../interface/profile/Profiles';

const getMyProfile = async (): Promise<ProfileApiData> => {
  return await fetch(`/profile`)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
const getAllProfiles = async (): Promise<SearchProfilesApiData> => {
  return await fetch(`/profile/all`)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { getMyProfile, getAllProfiles };
