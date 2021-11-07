import { Box, Paper, Typography, TextField, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useState } from 'react';

const AddReview = ({ handleClick }: { handleClick: (stars: number, reviewText: string) => void }): JSX.Element => {
  const [reviewText, setReviewText] = useState<string>('');
  const [stars, setStars] = useState<number>(0);

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
          onChange={(event, newValue) => newValue && setStars(newValue)}
          style={{ marginTop: '1rem' }}
        />
        <Button
          onClick={() => handleClick(stars, reviewText)}
          size="large"
          variant="contained"
          color="secondary"
          style={{ marginTop: '1rem' }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddReview;
