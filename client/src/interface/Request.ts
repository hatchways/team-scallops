import { User } from './User';

export interface Request {
  _id: string;
  owner: User;
  sitter: User;
  startDate: Date;
  endDate: Date;
  status: string;
  serviceType?: string;
  totalPrice?: number;
}

export interface RequestsList {
  requestsReceived: Request[];
  requestsSend: Request[];
}

export interface RequestApiData {
  error?: { message: string };
  request?: Request;
}
