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
  Input,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { Link } from 'react-router-dom';

import useStyles from './useStyles';
const profileImg = 'placeholderImage.png';
const placeholder = {
  rating: 5,
  price: 15,
  location: 'Toronto, Ontario',
};
const defaultDescription = 'New pet sitter!';

export default function UserCard(props: any): JSX.Element {
  const classes = useStyles();
  const { firstName, lastName, user, description, address } = props.profile;
  return (
    <Grid item>
      <Card style={{ height: '100%' }} variant="outlined">
        <CardActionArea component={Link} to={`sitter/detail/${user}`}>
          <Grid justify="center" alignItems="center" direction="column" container className={`${classes.card}`}>
            <Avatar src={profileImg} className={classes.avatar} />

            <CardContent>
              <Typography className={classes.fullName} variant="h6">
                {firstName} {lastName}
              </Typography>
              <Rating name="read-only" value={placeholder.rating} readOnly />

              <Typography>{description || defaultDescription}</Typography>
            </CardContent>
          </Grid>
        </CardActionArea>
        <Divider light />
        <Grid container className={`${classes.bottom}`} spacing={2}>
          <Grid item>
            <Typography className={classes.location}>{address}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.price}>${placeholder.price}/hr</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
