type image = {
  url: string;
  publicId: string;
};

export interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  address: string;
  available: boolean;
  description: string;
  image: image;
}
