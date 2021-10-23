import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import DatePicker from '../../components/DateRangePicker/DatePicker';
import SearchIcon from '@material-ui/icons/Search';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import moment from 'moment';
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

const profileImg = '775db5e79c5294846949f1f55059b53317f51e30.png';

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
    return <Box>loading</Box>;
  } else {
    return (
      <Box>
        <Grid justify="center" container sm>
          <Grid item className={`${classes.searchContainer}`}>
            <Typography align="center" variant="h4">
              Your search results
            </Typography>

            <Paper className={classes.searchbar}>
              <SearchIcon />
              <Input disableUnderline={true} placeholder="Search by location..."></Input>
              <Box display="inline" className={classes.search}>
                <CalendarTodayIcon />
                <Button onClick={() => setHidden(!hidden)}>{`
              ${moment(selection.startDate).format('DD-')}${`${moment(selection.endDate).format('DD MMMM YYYY')}`}
                `}</Button>
              </Box>
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
            const { firstName, lastName, userId, description } = profile;
            return (
              userId && (
                <Grid item key={key}>
                  <Card style={{ height: '100%' }} variant="outlined" key={key}>
                    <CardActionArea>
                      <Grid
                        justify="center"
                        alignItems="center"
                        direction="column"
                        container
                        className={`${classes.card}`}
                      >
                        <Avatar src={profileImg} className={classes.avatar} />

                        <CardContent>
                          <Typography>{/* <Link to={`profile?user=${userId}`}> {userId}</Link>*/}</Typography>
                          <Typography>
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
