import { Request } from './Request';
import { Profile } from './Profile';

export interface Review {
  _id: string;
  reviewerProfileId: Profile;
  reviewedProfileId: Profile;
  requestId: Request;
  starRating: number;
  text: string;
  updatedAt: Date;
}

export interface ReviewsApiDataSuccess {
  reviews: Review[];
}

export interface ReviewsApiData {
  error?: string;
  success?: ReviewsApiDataSuccess;
}
