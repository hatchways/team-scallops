import { FetchOptions } from '../../interface/FetchOptions';

const getMessages = async (conversationId: string | undefined) => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      conversationId: conversationId,
    }),
  };
  return await fetch(`/conversation/`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({ err: { message: err } }));
};

export default getMessages;
