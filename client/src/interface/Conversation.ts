import { User } from './User';

export interface Conversation {
  _id: string;
  firstUser: User;
  secondUser: User;
  lastMessage: Message;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  sender: User;
  text: string;
  conversation?: string | Conversation;
  createdAt?: string;
  updatedAt?: string;
}

export interface MessagesDataSuccess {
  messages: Message[];
}

export interface MessagesApiData {
  error?: { message: string };
  success?: MessagesDataSuccess;
}

export interface ConversationsDataSuccess {
  conversations: Conversation[];
}

export interface ConversationsApiData {
  error?: { message: string };
  success?: ConversationsDataSuccess;
}
