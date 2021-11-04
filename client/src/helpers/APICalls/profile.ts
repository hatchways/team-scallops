import { FetchOptions } from '../../interface/FetchOptions';
import { Profile } from '../../interface/Profile';
import { Review } from '../../interface/Review';

export async function getSitterProfile(userId?: string): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/profile/${userId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
}

export async function getSitterReviews(profileId?: string): Promise<Review[]> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/reviews/${profileId}`, fetchOptions)
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

export async function updateProfile({ profile }: Profile): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
    credentials: 'include',
  };

  return await fetch('/profile/', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server.' } }));
}
