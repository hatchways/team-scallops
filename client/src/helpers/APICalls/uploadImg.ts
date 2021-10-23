import axios from 'axios';

export const uploadImage = async (url: string, image: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'dog-sitter');

  const fetchOptions = {
    method: 'POST',
    body: formData,
  };

  const res = await fetch(url, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));

  return res.secure_url;

  // return await fetch('/profile', imageUrl)
  //   .then((res) => res.json())
  //   .catch(() => ({
  //     error: { message: 'Unable to save the image in database. Please try again' },
  //   }));
};
