type image = {
  url: string;
  publicId: string;
};

export interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  gender?: string;
  birthday?: Date | string;
  phone?: number;
  address?: string;
  description?: string;
  availability: AvailabilityInDays;
  available: boolean;
  user: string;
  image: image;
  averageRating?: number;
  ratePerDay?: number;
}

interface AvailabilityInDays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}
