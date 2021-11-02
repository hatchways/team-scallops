import { FetchOptions } from '../../interface/FetchOptions';
import { ReviewsApiData } from '../../interface/Reviews';

export async function getReviews(profileId: string): Promise<ReviewsApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/reviews/${profileId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

// const { reviewedProfileId, starRating, text } = req.body;

export async function postReview(profileId: string, stars: number | null, reviewText: string): Promise<ReviewsApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reviewedProfileId: profileId,
      starRating: stars,
      text: reviewText,
    }),
  };
  return await fetch(`/reviews/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
