import { Profile } from './profile/Profile';

export interface Review {
  reviewerProfileId: Profile;
  reviewedProfileId: Profile;
  requestId: Request;
  starRating: number;
  text: string;
}

export interface ReviewDataSuccess {
  reviews: Review[];
}

export interface ReviewsApiData {
  error?: { message: string };
  success?: ReviewDataSuccess;
}
