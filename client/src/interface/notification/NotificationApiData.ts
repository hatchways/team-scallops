import { Notification } from './Notification';

export interface NotificationApiDataSuccess {
  unReadNotifications: Notification[];
}

export interface NotificationApiData {
  error?: { message: string };
  success?: NotificationApiDataSuccess;
}
