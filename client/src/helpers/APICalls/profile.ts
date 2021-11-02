import { FetchOptions } from '../../interface/FetchOptions';
import { Profile } from '../../interface/Profile';

export async function getSitterProfile(sitterId?: string): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/profile/${sitterId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
}
