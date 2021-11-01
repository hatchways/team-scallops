import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { NotificationsApiData, NotificationsApiDataSuccess } from '../interface/notification/NotificationApiData';
import { Notification } from '../interface/notification/Notification';
import { getUnreadNotifications } from '../helpers/APICalls/notifications';

interface INotificationContext {
  updateNotificationContext: (data: NotificationsApiDataSuccess) => void;
  unReadNotifications: Notification[] | null;
}

export const NotificationContext = createContext<INotificationContext>({
  updateNotificationContext: () => null,
  unReadNotifications: null,
});

export const NotificationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [unReadNotifications, setUnReadNotifications] = useState<Notification[] | null>([]);

  const updateNotificationContext = useCallback((data: NotificationsApiDataSuccess) => {
    setUnReadNotifications(data.unReadNotifications);
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      await getUnreadNotifications().then((data: NotificationsApiData) => {
        if (data.success) {
          console.log(data.success);
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
