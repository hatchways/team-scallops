import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  TextField,
  Button,
  CardActions,
  CardContent,
  Divider,
  CardMedia,
  CardActionArea,
  Avatar,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const profileImg = '775db5e79c5294846949f1f55059b53317f51e30.png';
import useStyles from './useStyles';

export default function List(): JSX.Element {
  const classes = useStyles();

  const [state, setState] = useState({
    profiles: [],
  });

  useEffect(() => {
    function fetchProfile() {
      axios.get('profile/all').then((response: any) => {
        setState(response.data);
      });
    }
    fetchProfile();
  }, []);
  const profiles = state.profiles;

  if (!profiles) {
    return <Box>loading</Box>;
  } else {
    console.log(state);
    return (
      <Box>
        <Grid justify="center" container>
          <Grid item>
            <TextField
              variant="outlined"
              className={`${classes.search}`}
              placeholder="Search by location..."
            ></TextField>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={6} className={`${classes.root}`}>
          {profiles.map((profile, key) => {
            const { firstName, lastName, userId, description } = profile;
            return (
              userId && (
                <Grid item key={key}>
                  <Card variant="outlined" key={key}>
                    <CardActionArea>
                      <Grid
                        justify="center"
                        alignItems="center"
                        direction="column"
                        container
                        className={`${classes.card}`}
                      >
                        <Avatar src={profileImg} />

                        <CardContent>
                          <Typography>
                            <Link to={`profile?user=${userId}`}> {userId}</Link>
                          </Typography>
                          <Typography>
                            {firstName} {lastName}
                          </Typography>
                          <Typography> Rating</Typography>

                          <Typography>{description}</Typography>
                        </CardContent>
                      </Grid>
                    </CardActionArea>
                    <Divider light />
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography> Regina, Saskatchewan</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>$15/hr</Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              )
            );
          })}
        </Grid>
      </Box>
    );
  }
}
