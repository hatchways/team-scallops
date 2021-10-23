export interface Notification {
  id: string;
  type: string;
  isRead: boolean;
  sender: string;
  title: string;
  message: string;
  created_at: string;
}
