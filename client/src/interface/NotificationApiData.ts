import { Notification } from './Notification';

export interface NotificationApiDataSuccess {
  notifications: Notification[];
}

export interface NotificationApiData {
  error?: { message: string };
  success?: NotificationApiDataSuccess;
}
