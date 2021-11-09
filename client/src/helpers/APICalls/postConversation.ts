import { FetchOptions } from '../../interface/FetchOptions';

const postConversations = async (receiverId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      receiverId: receiverId,
    }),
  };
  return await fetch(`/conversation/`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({ err: { message: err } }));
};

export default postConversations;
