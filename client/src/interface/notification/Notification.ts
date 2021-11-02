export interface Notification {
  _id: string;
  type: string;
  isRead: boolean;
  sender: string;
  title: string;
  message: string;
  createdAt: Date;
  name: string;
  image: string;
}
