import { Grid, Paper, Box, Avatar, Typography, CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Fragment } from 'react';
import { Profile } from '../../interface/Profile';
import useStyles from './useStyles';

interface Props {
  profile: Profile | any;
  avgRating: number;
}

export default function ReviewProfile({ profile, avgRating }: Props): JSX.Element {
  const classes = useStyles();
  // temp as profile.profile is where data is
  const userProfile = profile;

  return (
    <Grid item xs={8} className={classes.profileWrapper} component={Paper}>
      <Box className={classes.profileSection}>
        {!!userProfile ? (
          <Fragment>
            <Avatar
              alt={`${userProfile.firstName} ${userProfile.lastName}`}
              src="https://robohash.org/mockLoggedInUser@gmail.com.png"
              className={classes.avatar}
            />
            <Box className={classes.textSection}>
              <Typography className={classes.userName}>{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
              <Typography className={classes.location}>{userProfile.location}</Typography>
              <Box style={{ marginTop: '.2rem' }} className={classes.rating}>
                <Typography style={{ fontWeight: 500 }}>Average rating: </Typography>
                {console.log('Rating is: ' + avgRating)}
                <Rating style={{ paddingLeft: '4px' }} value={avgRating} precision={0.5} readOnly />
                <Typography style={{ marginLeft: '1rem' }}>{avgRating}</Typography>
              </Box>
              <Typography className={classes.about}>{userProfile.description}</Typography>
            </Box>
          </Fragment>
        ) : (
          <CircularProgress style={{ margin: '0 auto' }} />
        )}
      </Box>
    </Grid>
  );
}
