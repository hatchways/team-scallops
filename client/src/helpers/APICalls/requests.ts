import { FetchOptions } from '../../interface/FetchOptions';
import { Request, RequestsList } from '../../interface/Request';
import { User } from '../../interface/User';

export async function getRequestList(): Promise<RequestsList> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch('/request/', fetchOptions).then((res) =>
    res.json().catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } })),
  );
}

export async function createRequest(
  sitterId: User,
  startDate: Date,
  endDate: Date,
  serviceType: string,
  totalPrice: number,
): Promise<Request> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sitterId, startDate, endDate, serviceType, totalPrice }),
    credentials: 'include',
  };
  return await fetch('/request/', fetchOptions).then((res) =>
    res.json().catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } })),
  );
}

export async function updateRequest(
  requestId: string,
  status: string,
  startDate?: Date,
  endDate?: Date,
  serviceType?: string,
  totalPrice?: number,
): Promise<{ request: Request }> {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, startDate, endDate, serviceType, totalPrice }),
    credentials: 'include',
  };
  return await fetch(`/request/${requestId}`, fetchOptions).then((res) =>
    res.json().catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } })),
  );
}
