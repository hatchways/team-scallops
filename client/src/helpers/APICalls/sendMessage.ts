import { FetchOptions } from '../../interface/FetchOptions';

// Fix this too!!!
const sendMessage = async (conversationId: string | undefined, text: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      conversationId: conversationId,
      text: text,
    }),
  };
  return await fetch(`/message`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({ err: { message: err } }));
};

export default sendMessage;
