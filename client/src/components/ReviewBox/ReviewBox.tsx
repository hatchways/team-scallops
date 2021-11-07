import { Typography, Box, Paper } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import { useAuth } from '../../context/useAuthContext';
import { Review } from '../../interface/Reviews';
import moment from 'moment';

interface Props {
  review: Review;
}

export default function ReviewBox({ review }: Props): JSX.Element {
  const { reviewerProfileId } = review;
  const { loggedInUser } = useAuth();

  return (
    <Box component={Paper} mt={2} mb={2}>
      <Box pt={1} pl={1} display="flex" alignItems="center" justifyContent="flex-start">
        <AvatarDisplay loggedIn user={loggedInUser} />
        <Box ml={1}>
          <Typography variant="h5">{reviewerProfileId.firstName}</Typography>
          <Typography variant="subtitle2">{moment(review.updatedAt).fromNow()}</Typography>
        </Box>
      </Box>

      <Box p={2}>
        <Rating name="user rating" value={review.starRating} readOnly />
        <Typography variant="body2" component="p">
          {review.text}
        </Typography>
      </Box>
    </Box>
  );
}
