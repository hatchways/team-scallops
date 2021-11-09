export interface Notification {
  senderProfile: {
    _id: string;
    image: string;
    firstName: string;
  };
  _id: string;
  type: string;
  isRead: boolean;
  title: string;
  message: string;
  createdAt: Date;
}
