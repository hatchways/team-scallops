import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApiData, AuthApiDataSuccess } from '../interface/AuthApiData';
import { User } from '../interface/User';
import { Profile } from '../interface/profile/Profile';
import { ProfileApiData } from '../interface/profile/ProfileApiData';
import { useSocket } from './useSocketContext';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import { getMyProfile } from '../helpers/APICalls/getProfilesApi';
import logoutAPI from '../helpers/APICalls/logout';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  myProfile: Profile | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  myProfile: undefined,
  updateLoginContext: () => null,
  logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [myProfile, setMyProfile] = useState<Profile | null | undefined>();
  const history = useHistory();
  const { socket, disconnectSocket } = useSocket();

  const updateLoginContext = useCallback(
    (data: AuthApiDataSuccess) => {
      setLoggedInUser(data.user);
      socket?.emit('online');
      history.push('/dashboard');
    },
    [history, socket],
  );
  const updateMyProfile = useCallback((data: ProfileApiData) => {
    setMyProfile(data.profile);
  }, []);

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        disconnectSocket();
        setLoggedInUser(null);
      })
      .catch((error) => console.error(error));
  }, [history, disconnectSocket]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
          history.push('/dashboard');
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          history.push('/land');
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history]);

  useEffect(() => {
    const fetchMyProfile = async () => {
      await getMyProfile().then((data: ProfileApiData) => {
        if (data.profile) {
          updateMyProfile(data);
        } else {
          setLoggedInUser(null);
        }
      });
    };
    fetchMyProfile();
  }, [updateMyProfile]);

  return (
    <AuthContext.Provider value={{ loggedInUser, myProfile, updateLoginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
