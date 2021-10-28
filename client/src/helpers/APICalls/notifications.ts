import { NotificationApiData } from '../../interface/NotificationApiData';

const getUnreadNotifications = async (): Promise<NotificationApiData> => {
  return await fetch(`/notification/unread`)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
const setUnreadNotificationToRead = async (id: string): Promise<NotificationApiData> => {
  return await fetch(`/notification/${id}`, { method: 'PATCH' })
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { getUnreadNotifications, setUnreadNotificationToRead };
