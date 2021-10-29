import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { ProfileApiData, ProfileApiDataSuccess } from '../interface/profile/ProfileApiData';
import { SearchProfilesApiData, ProfilesApiDataSuccess } from '../interface/profile/Profiles';
import { Profile } from '../interface/profile/Profile';
import { getMyProfile, getAllProfiles } from '../helpers/APICalls/getProfilesApi';

interface IProfileContext {
  myProfile: Profile | null | undefined;
  profiles: Profile[] | undefined;
  updateMyProfileContext: (data: ProfileApiDataSuccess) => void;
  updateProfilesContext: (data: SearchProfilesApiData) => void;
}

export const ProfileContext = createContext<IProfileContext>({
  myProfile: undefined,
  profiles: [],
  updateMyProfileContext: () => null,
  updateProfilesContext: () => null,
});

export const ProfileProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [myProfile, setMyProfile] = useState<Profile | null | undefined>();
  const [profiles, setProfiles] = useState<Profile[] | undefined>([]);

  const updateMyProfileContext = useCallback((data: ProfileApiDataSuccess) => {
    setMyProfile(data.profile);
  }, []);
  const updateProfilesContext = useCallback((data: ProfilesApiDataSuccess) => {
    setProfiles(data.profiles);
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      await getMyProfile().then((data: ProfileApiData) => {
        if (data.success) {
          updateMyProfileContext(data.success);
        } else {
          setProfiles([]);
        }
      });
      await getAllProfiles().then((data: ProfilesApiDataSuccess) => {
        updateProfilesContext(data);
      });
    };
    getProfile();
  }, [updateMyProfileContext, updateProfilesContext]);

  return (
    <ProfileContext.Provider value={{ myProfile, profiles, updateMyProfileContext, updateProfilesContext }}>
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile(): IProfileContext {
  return useContext(ProfileContext);
}
