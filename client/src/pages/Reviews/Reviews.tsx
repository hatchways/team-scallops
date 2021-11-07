import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@material-ui/core';
// import { useParams } from 'react-router';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import ReviewProfile from '../../components/ReviewProfile/ReviewProfile';
import useStyles from './useStyles';
import { getReviews, postReview } from '../../helpers/APICalls/Reviews';
import { getSitterProfile } from '../../helpers/APICalls/profile';
import { useEffect, useState } from 'react';
import { Profile } from '../../interface/Profile';
import { Review } from '../../interface/Reviews';
import { da } from 'date-fns/locale';
import { Rating } from '@material-ui/lab';

const Reviews = (): JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [profile, setProfile] = useState<Profile>();
  const { myProfile } = useAuth();
  const [avgRating, setAvgRating] = useState<number>(0);
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  // const { profileId } = useParams<{ profileId: string }>();

  useEffect(() => {
    getReviews('6186f80a8e26672c03e60518').then((data) => {
      console.log(data);
      if (!!data.error) {
        updateSnackBarMessage('Encountered Error while fetching reviews data');
        return;
      }
      if (!!data.success) {
        let avg = 0;
        data.success.reviews.forEach((rev) => {
          avg += rev.starRating;
        });
        setAvgRating(avg / data.success.reviews.length);
        setReviews(data.success?.reviews);
      }
    });

    getSitterProfile('6186f7f88e26672c03e60512').then((data) => {
      console.log(data);
      if (!data) {
        updateSnackBarMessage('Encountered Error while fetching profile data');
        return;
      }
      setProfile(data);
    });
  }, [myProfile, updateSnackBarMessage]);

  const AddReview = (): JSX.Element => {
    const [reviewText, setReviewText] = useState<string>('');
    const [stars, setStars] = useState<number | null>(null);

    const handleClick = () => {
      console.log(stars + ' + ' + reviewText);
      if (!myProfile) return;
      postReview('6186f80a8e26672c03e60518', stars, reviewText).then((data) => {
        if (data.success) {
          updateSnackBarMessage('Review added!');
        } else if (data.error) {
          updateSnackBarMessage(data.error);
        }
      });
    };

    return (
      <Grid item xs={8}>
        <Box
          component={Paper}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: '15rem', padding: '1rem' }}
        >
          <Typography variant="h4" style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}>
            Submit a review here.
          </Typography>
          <TextField
            onChange={(event) => setReviewText(event.target.value)}
            placeholder="Type review here"
            variant="outlined"
            multiline
            fullWidth
            minRows={3}
            maxRows={3}
          />
          <Rating
            name="rating-submit"
            value={stars}
            onChange={(event, newValue) => setStars(newValue)}
            style={{ marginTop: '1rem' }}
          />
          <Button
            onClick={handleClick}
            size="large"
            variant="contained"
            color="secondary"
            style={{ marginTop: '1rem' }}
          >
            Submit
          </Button>
        </Box>
      </Grid>
    );
  };

  // if (!reviews.length || !profile) return <CircularProgress />;

  return (
    <Grid container className={classes.root}>
      <ReviewProfile profile={profile} avgRating={avgRating} />
      <Grid container className={classes.reviewsWrapper}>
        {reviews.map((review) => {
          return <ReviewCard review={review} key={review._id} />;
        })}
      </Grid>
      <AddReview />
    </Grid>
  );
};

export default Reviews;
