import { useState, useEffect } from 'react';

import { DatePicker, Day, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
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

interface RequestsPerMonth {
  [key: number]: Array<number>;
}
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

  const [requests, setRequests] = useState<RequestsList>();
  const [selectedDate, setDate] = useState<MaterialUiPickersDate>(new Date());

  useEffect(() => {
    async function getRequestsAndSave() {
      const allRequests = await getRequestList();
      setRequests(allRequests);
    }

    getRequestsAndSave();
  }, []);

  const requestsReceived = requests?.requestsReceived;
  console.log({ requestsReceived });
  const today = new Date();
  const pastBookings = requestsReceived?.filter((request) => isPast(new Date(request.endDate)));
  const currentBookings = requestsReceived?.filter((request) =>
    isWithinInterval(today, {
      start: new Date(request.startDate),
      end: new Date(request.endDate),
    }),
  );
  const upcomingBookings = requestsReceived?.filter((request) => isFuture(new Date(request.startDate)));
  const requestsDayPerMonth: RequestsPerMonth = {};
  requestsReceived
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
                    status={request.status}
                    upcoming
                  />
                ))
              ) : (
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  You will not have pet visits in the near future 🔮 — <strong>BE PATIENT!</strong>
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
                    status={request.status}
                  />
                ))
              ) : (
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  You are not taking care of any pets for now. 🛀 — <strong>RELAX!</strong>
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
                    status={request.status}
                  />
                ))
              ) : (
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  Do not worry, you will be able to see your memories 🐾 — <strong>SOON!</strong>
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
