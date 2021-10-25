import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { NotificationApiData, NotificationApiDataSuccess } from '../interface/NotificationApiData';
import { Notification } from '../interface/Notification';
import getUnreadNotifications from '../helpers/APICalls/getUnreadNotifications';

interface INotificationContext {
  updateNotificationContext: (data: NotificationApiDataSuccess) => void;
}

export const NotificationContext = createContext<INotificationContext>({
  updateNotificationContext: () => null,
});

export const NotificationProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<Notification[] | null | undefined>();
  const history = useHistory();

  const updateNotificationContext = useCallback(
    (data: NotificationApiDataSuccess) => {
      setLoggedInUser(data.notifications);
      history.push('/dashboard');
    },
    [history],
  );

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const getNotifications = async () => {
      await getUnreadNotifications().then((data: NotificationApiData) => {
        if (data.success) {
          updateNotificationContext(data.success);
          history.push('/dashboard');
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          history.push('/login');
        }
      });
    };
    getNotifications();
  }, [updateNotificationContext, history]);

  return <NotificationContext.Provider value={{ updateNotificationContext }}>{children}</NotificationContext.Provider>;
};

export function useNotification(): INotificationContext {
  return useContext(NotificationContext);
}
