import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { NotificationApiData, NotificationApiDataSuccess } from '../interface/NotificationApiData';
import { Notification } from '../interface/Notification';
import getUnreadNotifications from '../helpers/APICalls/getUnreadNotifications';

interface INotificationContext {
  updateNotificationContext: (data: NotificationApiDataSuccess) => void;
  unReadNotifications: Notification[] | null;
}

export const NotificationContext = createContext<INotificationContext>({
  updateNotificationContext: () => null,
  unReadNotifications: null,
});

export const NotificationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [unReadNotifications, setUnReadNotifications] = useState<Notification[] | null>([]);

  const updateNotificationContext = useCallback((data: NotificationApiDataSuccess) => {
    setUnReadNotifications(data.unReadNotifications);
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      await getUnreadNotifications().then((data: NotificationApiData) => {
        if (data.success) {
          updateNotificationContext(data.success);
        } else {
          setUnReadNotifications(null);
        }
      });
    };
    getNotifications();
  }, [updateNotificationContext]);

  return (
    <NotificationContext.Provider value={{ unReadNotifications, updateNotificationContext }}>
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification(): INotificationContext {
  return useContext(NotificationContext);
}
