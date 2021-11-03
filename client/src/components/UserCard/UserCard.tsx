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
import useStyles from './useStyles';
const profileImg = '775db5e79c5294846949f1f55059b53317f51e30.png';

export default function UserCard(props: any): JSX.Element {
  const classes = useStyles();
  const { firstName, lastName, user, description } = props.profile;
  return (
    <Grid item key={user}>
      <Card style={{ height: '100%' }} variant="outlined" key={user}>
        <CardActionArea>
          <Grid justify="center" alignItems="center" direction="column" container className={`${classes.card}`}>
            <Avatar src={profileImg} className={classes.avatar} />

            <CardContent>
              <Typography className={classes.fullName} variant="h6">
                {firstName} {lastName}
              </Typography>
              <Typography> Rating</Typography>

              <Typography>{description ? description : 'Default description'}</Typography>
            </CardContent>
          </Grid>
        </CardActionArea>
        <Divider light />
        <Grid container className={`${classes.bottom}`} spacing={2}>
          <Grid item>
            <Typography className={classes.location}> Regina, Saskatchewan</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.price}>$20/hr</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
