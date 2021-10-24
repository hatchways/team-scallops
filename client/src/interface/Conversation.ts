import { User } from './User';

// export interface ConversationApiDataSuccess {
//   message: string;
//   conversations: Conversation[];
// }

// check please
export interface Conversation {
  _id: string;
  firstUser: User;
  secondUser: User;
  lastMessage: string | Message;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  sendByUser: User;
  text: string;
  conversation?: string | Conversation;
  createdAt?: string;
  updatedAt?: string;
}
