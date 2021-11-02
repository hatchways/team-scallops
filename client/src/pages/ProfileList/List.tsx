import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import DatePicker from '../../components/DateRangePicker/DatePicker';
import SearchIcon from '@material-ui/icons/Search';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import profilePhoto from '../../images/women-striped-blouse.png';
import moment from 'moment';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  Button,
  CardContent,
  Divider,
  CardActionArea,
  Avatar,
  Input,
} from '@material-ui/core';

const placeholder = {
  rating: 5,
  price: 15,
  location: 'Toronto, Ontario',
};
const defaultDescription = 'New pet sitter!';

export default function List(): JSX.Element {
  const classes = useStyles();
  const [state, setState] = useState({
    profiles: [],
  });
  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const profiles = state.profiles;
  const [hidden, setHidden] = useState(true);

  const handleSelect = (ranges: any) => {
    setSelection(ranges.selection);
  };
  useEffect(() => {
    function fetchProfile() {
      axios.get('profile/all').then((response: any) => {
        setState(response.data);
      });
    }
    fetchProfile();
  }, []);

  if (!profiles) {
    return <CircularProgress />;
  } else {
    return (
      <Box>
        <Grid justify="center" container sm>
          <Grid item className={`${classes.searchContainer}`}>
            <Typography align="center" variant="h4">
              Your search results
            </Typography>

            <Paper className={classes.searchbar}>
              <Grid alignItems="center" container>
                <Grid item>
                  <SearchIcon />
                  <Input disableUnderline={true} placeholder="Search by location..."></Input>
                </Grid>
                <Grid item>
                  <Box display="inline" className={classes.search}>
                    <CalendarTodayIcon />
                    <Button onClick={() => setHidden(!hidden)}>{`
              ${moment(selection.startDate).format('DD-')}${`${moment(selection.endDate).format('DD MMMM YYYY')}`}
                `}</Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            <Box display="inline" className={classes.datePicker}>
              <Paper hidden={hidden}>
                <DatePicker handleSelect={handleSelect} />
              </Paper>
            </Box>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={6} className={`${classes.root}`}>
          {profiles.map((profile, key) => {
            const { firstName, lastName, user, description } = profile;
            return (
              user && (
                <Grid item key={user}>
                  <Card style={{ height: '100%' }} variant="outlined" key={key}>
                    <CardActionArea component={Link} to={`profile/${user}`}>
                      <Grid
                        justify="center"
                        alignItems="center"
                        direction="column"
                        container
                        className={`${classes.card}`}
                      >
                        <Avatar src={profilePhoto} className={classes.avatar} />

                        <CardContent>
                          <Typography className={classes.fullName} variant="h6">
                            {firstName} {lastName}
                          </Typography>
                          <Rating name="read-only" value={placeholder.rating} readOnly />

                          <Typography>{description ? description : defaultDescription}</Typography>
                        </CardContent>
                      </Grid>
                    </CardActionArea>
                    <Divider light />
                    <Grid container className={`${classes.bottom}`} spacing={2}>
                      <Grid item>
                        <Typography className={classes.location}>{placeholder.location}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.price}>${placeholder.price}/hr</Typography>
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
