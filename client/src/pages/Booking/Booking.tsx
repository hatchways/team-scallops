import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
// import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
// import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import { useState, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import NavBar from '../../components/NavBar/NavBar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import person from '../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';
// import BasicDatePicker from '../../components/BasicDatePicker/BasicDatePicker';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { format } from 'date-fns';

function Booking(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const history = useHistory();

  // let today = new Date('Apr 05, 2020');
  // let nextDay = new Date('Apr 0, 2020');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDays] = useState([1, 2, 15]);
  const [selectedDate, setDate] = useState<MaterialUiPickersDate>(new Date());
  const open = Boolean(anchorEl);

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
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <NavBar loggedInUser={loggedInUser} />
      <Grid container spacing={6} className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader
              action={
                <>
                  <IconButton aria-label="more" onClick={handleClick}>
                    <SettingsIcon />
                  </IconButton>
                  <Menu id="settings" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} elevation={0}>
                    <MenuItem>View</MenuItem>
                    <MenuItem>Accept</MenuItem>
                    <MenuItem>Decline</MenuItem>
                  </Menu>
                </>
              }
              title="YOUR NEXT BOOKING:"
              disableTypography
            />
            <CardContent>
              <Typography variant="h5" component="h2" className={classes.pos}>
                5 April 2020, 10-12 AM
              </Typography>
              <Box className={classes.details}>
                <Avatar aria-label="next-booking" alt="Person" src={person} className={classes.large} />
                <Typography variant="h6" color="textPrimary" component="span" display="inline">
                  Norma Byers
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="With server Data"
              value={selectedDate}
              onChange={handleDateChange}
              autoOk
              disableToolbar
              variant="static"
              // renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
              //   // const date = format(day as Date, 'yyyy-MM-dd');
              //   const isSelected = isInCurrentMonth && selectedDays.includes(date);

              //   // You can also use our internal <Day /> component
              //   return <Badge badgeContent={isSelected ? '🌚' : undefined}>{dayComponent}</Badge>;
              // }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </>
  );
}

export default Booking;
