import { Notification } from './Notification';

export interface NotificationsApiDataSuccess {
  unReadNotifications: Notification[];
}
export interface NotificationApiData {
  error?: { message: string };
  success?: Notification;
}

export interface NotificationsApiData {
  error?: { message: string };
  success?: NotificationsApiDataSuccess;
}
