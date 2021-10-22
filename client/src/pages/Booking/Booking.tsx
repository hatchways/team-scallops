import { useState } from 'react';

import { DatePicker, Day, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

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

  const [bookedDays] = useState<number[]>([21, 25]);
  const [selectedDate, setDate] = useState<MaterialUiPickersDate>(new Date());

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
      <Grid container spacing={6} direction="row" alignContent="center" alignItems="center" className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Card>
              <Typography variant="h6" className={classes.title}>
                your next booking:
              </Typography>
              <BookingItem upcoming />
            </Card>
          </Paper>
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
          <Paper elevation={3}>
            <Card>
              <Typography variant="h6" className={classes.title}>
                current bookings:
              </Typography>
              <BookingItem />
              <Typography variant="h6" className={classes.title}>
                past bookings:
              </Typography>
              <BookingItem />
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Booking;
