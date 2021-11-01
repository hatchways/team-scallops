export interface Notification {
  id: string;
  type: string;
  isRead: boolean;
  sender: string;
  title: string;
  message: string;
  createdAt: string;
  name: string;
  image: string;
  service: string;
}
