export interface Profile {
  profile: {
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
  };
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
