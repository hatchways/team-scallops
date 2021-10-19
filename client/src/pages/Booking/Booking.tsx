import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { DatePicker, Day, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { useAuth } from '../../context/useAuthContext';
import NavBar from '../../components/NavBar/NavBar';
import BookingItem from '../../components/BookingItem/BookingItem';
import useStyles from './useStyles';

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: '#ff4545',
      },
      daysHeader: {
        justifyContent: 'space-around',
      },
    },
    MuiPickersDay: {
      daySelected: {
        color: '#ffffff',
        backgroundColor: '#ff4545',
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        maxWidth: '100%',
      },
    },
    MuiPickersCalendar: {
      week: {
        justifyContent: 'space-around',
      },
    },
  },
});

function Booking(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const history = useHistory();

  const [bookedDays] = useState<number[]>([21, 25]);
  const [selectedDate, setDate] = useState<MaterialUiPickersDate>(new Date());

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  const handleDateChange = (date: MaterialUiPickersDate): MaterialUiPickersDate => {
    setDate(date);
    return date;
  };

  const renderDay = (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    isInCurrentMonth: boolean,
    dayComponent: JSX.Element,
  ) => {
    const isBooked = day && isInCurrentMonth && bookedDays.includes(day.getDate());

    const upcomingBookingFormat = isBooked ? <Day selected>{dayComponent}</Day> : <span>{dayComponent}</span>;
    return upcomingBookingFormat;
  };

  return (
    <>
      <NavBar loggedInUser={loggedInUser} />
      <Grid container spacing={6} direction="row" alignContent="center" alignItems="center" className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Card>
            <BookingItem title="your next booking:" upcoming />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiThemeProvider theme={materialTheme}>
              <DatePicker
                label="With server Data"
                value={selectedDate}
                onChange={handleDateChange}
                autoOk
                disableToolbar
                disablePast
                variant="static"
                renderDay={renderDay}
              />
            </MuiThemeProvider>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <BookingItem title="current bookings:" />
            <BookingItem title="past bookings:" />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Booking;
