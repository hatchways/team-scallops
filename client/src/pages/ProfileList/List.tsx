import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/useAuthContext';

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
import { Filter } from '@material-ui/icons';

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
  const loggedInUser = useAuth();
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    event.preventDefault();
  };
  const dateFilter = (profile: Profile) => {
    let count = 0;
    const requestDays = moment.range(new Date(selection.startDate), new Date(selection.endDate));
    for (const day of requestDays.by('day')) {
      const weekDay = day.format('dddd').toLowerCase();
      const availability: Record<string, any> = profile.availability;
      if (!availability) {
        return;
      }
      if (availability) {
        if (availability[weekDay] === false) {
          count++;
        }
      }
    }
    if (count === 0) {
      return profile;
    }
  };

  const locationFilter = (profile: Profile) => {
    if (profile.address) {
      if (profile.address.toLowerCase().includes(searchTerm.toLowerCase())) {
        return profile;
      }
      if (!searchTerm) {
        return profile;
      }
    }
  };

  //TODO: implement filter to only show profiles where user.isSitter is true
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
              return dateFilter(profile);
            })
            .filter((profile: Profile) => {
              return locationFilter(profile);
            })
            .map((profile, key) => (
              <UserCard profile={profile} key={key} />
            ))}
        </Grid>
      </Box>
    );
  }
}
