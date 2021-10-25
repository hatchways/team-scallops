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
  lastMessage: Message;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  sender: User;
  text: string;
  conversation?: string | Conversation;
  createdAt?: string;
  updatedAt?: string;
}
