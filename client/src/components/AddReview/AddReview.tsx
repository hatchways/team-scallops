import { Grid, Box, Paper, Typography, TextField, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import { postReview } from '../../helpers/APICalls/Reviews';

const AddReview = ({ profileId }: { profileId: string }): JSX.Element => {
  const [reviewText, setReviewText] = useState<string>('');
  const [stars, setStars] = useState<number | null>(null);
  const { updateSnackBarMessage } = useSnackBar();

  const handleClick = () => {
    console.log(stars + ' + ' + reviewText);
    postReview(profileId, stars, reviewText).then((data) => {
      if (data.success) {
        updateSnackBarMessage('Review added!');
      } else if (data.error) {
        updateSnackBarMessage(data.error);
      }
    });
  };

  return (
    <>
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
        <Button onClick={handleClick} size="large" variant="contained" color="secondary" style={{ marginTop: '1rem' }}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddReview;
