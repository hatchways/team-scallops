import { useState, useEffect } from 'react';
import axios from 'axios';
import useStyles from './useStyles';
import DatePicker from '../../components/DateRangePicker/DatePicker';
import SearchIcon from '@material-ui/icons/Search';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import UserCard from '../../components/UserCard/UserCard';
import { CircularProgress } from '@material-ui/core';
import profilePhoto from '../../images/women-striped-blouse.png';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
const availability = {
  monday: true,
  tuesday: true,
  wednesday: true,
  thurdsay: true,
  friday: true,
  saturday: true,
  sunday: true,
};

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

import { Profile } from '../../interface/profile/Profile';

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
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
    event.preventDefault();
  };

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
                  <Input
                    name="searchTerm"
                    value={searchTerm}
                    onChange={handleChange}
                    disableUnderline={true}
                    placeholder="Search by location..."
                  ></Input>
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
        <Grid container spacing={10} className={`${classes.root}`} sm>
          {profiles
            .filter((profile: Profile) => {
              if (profile.address && profile.address.includes(searchTerm)) {
                return profile;
              }
            })
            .filter((profile: Profile) => {
              //TODO: Implement date search
              // const requestDays = moment.range(new Date(selection.startDate), new Date(selection.endDate));

              // const days = Array.from(requestDays.by('day'));
              // days.map((day) => {
              //   if (day) {
              //     const weekday = moment(day).format('dddd');
              //     if (availability[weekday as key] === false) {
              //       return;
              //     }
              //   }
              // });
              return profile;
            })
            .map((profile, key) => (
              <UserCard profile={profile} key={key} />
            ))}
        </Grid>
      </Box>
    );
  }
}
