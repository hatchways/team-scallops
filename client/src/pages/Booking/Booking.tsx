import { useState, useEffect } from 'react';

import { DatePicker, Day, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { MuiThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core';
import { isPast, isWithinInterval, isFuture, eachDayOfInterval, getDate, getMonth } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { getRequestList } from '../../helpers/APICalls/requests';
import { RequestsList } from '../../interface/Request';
import BookingItem from '../../components/BookingItem/BookingItem';
import useStyles from './useStyles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useAuth } from '../../context/useAuthContext';

interface RequestsPerMonth {
  [key: number]: Array<number>;
}
const materialTheme = createTheme({
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

  const [requests, setRequests] = useState<RequestsList>();
  const [selectedDate, setDate] = useState<MaterialUiPickersDate>(new Date());

  useEffect(() => {
    async function getRequestsAndSave() {
      const allRequests = await getRequestList();
      setRequests(allRequests);
    }

    getRequestsAndSave();
  }, []);

  const requestsToDisplay = loggedInUser?.isSitter ? requests?.requestsReceived : requests?.requestsSend;
  const today = new Date();
  const pastBookings = requestsToDisplay?.filter((request) => isPast(new Date(request.endDate)));
  const currentBookings = requestsToDisplay?.filter((request) =>
    isWithinInterval(today, {
      start: new Date(request.startDate),
      end: new Date(request.endDate),
    }),
  );
  const upcomingBookings = requestsToDisplay?.filter((request) => isFuture(new Date(request.startDate)));

  const requestsDayPerMonth: RequestsPerMonth = {};
  requestsToDisplay
    ?.map((request) => eachDayOfInterval({ start: new Date(request.startDate), end: new Date(request.endDate) }))
    .map((interval) => {
      interval.map((date) => {
        const month = getMonth(date);
        const day = getDate(date);

        if (requestsDayPerMonth[month]) {
          requestsDayPerMonth[month].push(day);
        } else {
          requestsDayPerMonth[month] = [];
          requestsDayPerMonth[month].push(day);
        }
      });
    });

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
    let daysBookedInMonth: number[] = [];
    const monthOfPickerDay = day?.getMonth();

    if (monthOfPickerDay) {
      Object.entries(requestsDayPerMonth).forEach(([key, value]) => {
        if (value) {
          if (parseInt(key) === monthOfPickerDay) {
            daysBookedInMonth = requestsDayPerMonth[monthOfPickerDay];
          }
        }
      });
    }

    const isBooked = day && isInCurrentMonth && daysBookedInMonth?.includes(day?.getDate());

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
              {upcomingBookings?.length ? (
                upcomingBookings?.map((request) => (
                  <BookingItem
                    key={request._id}
                    requestId={request._id}
                    from={request.startDate}
                    to={request.endDate}
                    owner={request.owner}
                    sitter={request.sitter}
                    status={request.status}
                    upcoming
                  />
                ))
              ) : loggedInUser?.isSitter ? (
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  You will not have pet visits in the near future 🔮
                  <strong className={classes.title}>be patient!</strong>
                </Alert>
              ) : (
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  No travel plans in the near future. 🔮
                </Alert>
              )}
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
              {currentBookings?.length ? (
                currentBookings?.map((request) => (
                  <BookingItem
                    key={request._id}
                    requestId={request._id}
                    from={request.startDate}
                    to={request.endDate}
                    owner={request.owner}
                    sitter={request.sitter}
                    status={request.status}
                  />
                ))
              ) : loggedInUser?.isSitter ? (
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  You are not taking care of any pets for now 🛀 <strong className={classes.title}>relax!</strong>
                </Alert>
              ) : (
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  Enjoy your pet today, it is time to play! 🐾
                </Alert>
              )}
              <Typography variant="h6" className={classes.title}>
                past bookings:
              </Typography>
              {pastBookings?.length ? (
                pastBookings?.map((request) => (
                  <BookingItem
                    key={request._id}
                    requestId={request._id}
                    from={request.startDate}
                    to={request.endDate}
                    owner={request.owner}
                    sitter={request.sitter}
                    status={request.status}
                    past
                  />
                ))
              ) : loggedInUser?.isSitter ? (
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  Do not worry, you will be able to see your memories 🐾
                  <strong className={classes.title}>soon!</strong>
                </Alert>
              ) : (
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  Book today, so we can have something to show you here. 🧾
                </Alert>
              )}
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Booking;
