import { Box, Paper, Typography, TextField, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useState } from 'react';
import useStyles from './useStyles';

const AddReview = ({ handleClick }: { handleClick: (stars: number, reviewText: string) => void }): JSX.Element => {
  const [reviewText, setReviewText] = useState<string>('');
  const [stars, setStars] = useState<number>(0);
  const classes = useStyles();

  return (
    <>
      <Box
        component={Paper}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className={classes.reviewContainer}
      >
        <Typography variant="h4" className={classes.reviewHeading}>
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
          className={classes.reviewRating}
        />
        <Button
          onClick={() => handleClick(stars, reviewText)}
          size="large"
          variant="contained"
          color="secondary"
          className={classes.reviewSubmit}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddReview;
