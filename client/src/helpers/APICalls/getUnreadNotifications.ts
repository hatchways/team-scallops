// import { NotificationApiData } from '../../interface/NotificationApiData';

const getUnreadNotifications = async () => {
  return await fetch(`/notification/unread`)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getUnreadNotifications;
