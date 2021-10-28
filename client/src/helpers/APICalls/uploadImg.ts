export const uploadImage = async (url: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'dog-sitter');

  const fetchOptions = {
    method: 'POST',
    body: formData,
  };

  const image = await fetch(url, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      return {
        url: data.secure_url,
        public_id: data.public_id,
      };
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));

  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image }),
  };

  return await fetch('/profile', postOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to save the image in database. Please try again' },
    }));
};
