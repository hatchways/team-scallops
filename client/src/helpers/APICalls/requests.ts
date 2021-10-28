import { FetchOptions } from '../../interface/FetchOptions';
import { Request, RequestApiData, RequestsList } from '../../interface/Request';

export async function getRequestList(): Promise<RequestsList> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch('/request/', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
}

export async function createRequest(
  sitterId: string,
  startDate: Date,
  endDate: Date,
  serviceType?: string,
  totalPrice?: number,
): Promise<RequestApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sitterId, startDate, endDate, serviceType, totalPrice }),
    credentials: 'include',
  };
  return await fetch('/request/', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
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
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, startDate, endDate, serviceType, totalPrice }),
    credentials: 'include',
  };
  return await fetch(`/request/${requestId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
}
