import { FetchOptions } from '../../interface/FetchOptions';
import { Profile } from '../../interface/Profile';
import { AvailabilityInDays } from '../../interface/Profile';

export async function getSitterProfile(sitterId?: string): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/profile/${sitterId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
}

export async function getUserProfile(): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/profile/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server.' } }));
}

export async function updateProfile(availability: AvailabilityInDays): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ availability }),
    credentials: 'include',
  };

  return await fetch('/profile/', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server.' } }));
}
