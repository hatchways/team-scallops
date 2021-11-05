import { Typography, Button, TextField, Select, CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../../context/useAuthContext';
import useStyles from './useStyles';
import moment from 'moment';
import { useSnackBar } from '../../../../context/useSnackbarContext';
moment().format();

export default function ProfileEditForm(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [hasProfile, setHasProfile] = useState(false);
  const classes = useStyles();
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    birthday: '',
    dobDay: 10,
    dobMonth: 'May',
    dobYear: 2020,
    phone: '',
    address: '',
    description: '',
    profile: {},
  });

  const textboxSize = 7;
  const labelSize = 3;

  useEffect(() => {
    async function fetchProfile() {
      await axios.get('/profile').then((response: any) => {
        if (typeof response.data.profile === 'object') {
          const profile = response.data.profile;
          if (profile === null) {
            setHasProfile(false);
          } else {
            setState(profile);
            setHasProfile(true);
          }
        }
      });
    }
    fetchProfile();
  }, []);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    return <CircularProgress />;
  } else {
    const years = (back = 150) => {
      const year = new Date().getFullYear();
      return Array.from({ length: back }, (v, i) => year - back + i + 1);
    };

    const days = (year = 2020, month = 'May') => {
      const mnt = `${year} ${month}`;
      const md = moment(mnt, 'YYYY-MMMM').daysInMonth();
      const test = [...Array(md).keys()];
      return test;
    };
    return (
      <Grid container justify="center">
        <Typography display="block" variant="h5" className={`${classes.title}`}>
          Edit Profile
        </Typography>
        <Grid item xs={12}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: state.firstName,
              lastName: state.lastName,
              email: state.email,
              gender: state.gender,
              birthday: state.birthday,
              dobDay: parseInt(state.birthday.slice(8, 10)) || state.dobDay,
              dobMonth: state.birthday.slice(5, 7) || state.dobMonth,
              dobYear: state.birthday.slice(0, 4) || state.dobYear,
              dayArray: days(state.dobYear, state.dobMonth),
              monthArray: [...moment.months()],
              yearArray: years(),
              phone: state.phone,
              address: state.address,
              description: state.description,
            }}
            onSubmit={(values, actions) => {
              const { firstName, lastName, email, gender, dobDay, dobMonth, dobYear, phone, address, description } =
                values;
              const birthdayString = `${dobYear}-${dobMonth}-${dobDay}`;

              const modifiedValues = {
                firstName,
                lastName,
                email,
                gender,
                birthday: birthdayString,
                phone,
                address,
                description,
              };
              setTimeout(async () => {
                if (!hasProfile) {
                  await axios.post('/profile/', modifiedValues);
                  updateSnackBarMessage('Profile created!');
                } else {
                  await axios
                    .patch('/profile/', modifiedValues)
                    .catch((error) => {
                      updateSnackBarMessage(error);
                    })
                    .then((response) => {
                      updateSnackBarMessage('success!');
                    });
                }
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Grid container justify="space-evenly" alignItems="center" spacing={1}>
                  <Grid item xs={labelSize}>
                    <Typography className={classes.label}>First Name</Typography>
                  </Grid>
                  <Grid item className={`${classes.textboxContainer}`} justify="flex-end" xs={textboxSize}>
                    <TextField
                      className={`${classes.textbox}`}
                      required
                      placeholder="John"
                      size="medium"
                      id="firstName"
                      name="firstName"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.firstName}
                    ></TextField>
                  </Grid>
                  <Grid item xs={labelSize}>
                    <Typography className={classes.label}>Last Name</Typography>
                  </Grid>

                  <Grid item className={`${classes.textboxContainer}`} justify="flex-end" xs={textboxSize}>
                    <TextField
                      required
                      placeholder="Doe"
                      className={`${classes.textbox}`}
                      size="medium"
                      id="lastName"
                      name="lastName"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.lastName}
                    ></TextField>
                  </Grid>
                  <Grid item xs={labelSize}>
                    <Typography className={classes.label}>Gender</Typography>
                  </Grid>
                  <Grid item className={`${classes.textboxContainer}`} justify="flex-end" xs={textboxSize}>
                    <Select
                      className={`${classes.gender}`}
                      id="gender"
                      name="gender"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="dropdown"
                      value={props.values.gender}
                    >
                      <MenuItem value={'Male'}>Male</MenuItem>
                      <MenuItem value={'Female'}>Female</MenuItem>
                      <MenuItem value={undefined}>Prefer not to say</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={labelSize}>
                    <Typography className={classes.label}>Birthday</Typography>
                  </Grid>
                  <Grid item className={`${classes.textboxContainer}`} justify="flex-end" xs={textboxSize}>
                    <Select
                      required
                      className={`${classes.birthday}`}
                      id="dobDay"
                      name="dobDay"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.dobDay}
                    >
                      {props.values.dayArray &&
                        props.values.dayArray.map((item, key) => {
                          return (
                            <MenuItem key={key} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                    </Select>
                    <Select
                      required
                      className={`${classes.birthday}`}
                      id="dobMonth"
                      name="dobMonth"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={moment().month(props.values.dobMonth).format('MMMM')}
                    >
                      {props.values.monthArray &&
                        props.values.monthArray.map((item, key) => {
                          return (
                            <MenuItem key={key} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                    </Select>

                    <Select
                      required
                      className={`${classes.birthday}`}
                      id="dobYear"
                      name="dobYear"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.dobYear}
                    >
                      {props.values.yearArray &&
                        props.values.yearArray.map((item, key) => {
                          return (
                            <MenuItem key={key} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </Grid>
                  <Grid item xs={labelSize}>
                    <Typography className={classes.label}>Email</Typography>
                  </Grid>
                  <Grid item className={`${classes.textboxContainer}`} justify="flex-end" xs={textboxSize}>
                    {/*TODO: handle updating email */}
                    <TextField
                      className={`${classes.textbox}`}
                      size="medium"
                      id="email"
                      name="email"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={loggedInUser.email}
                    ></TextField>
                  </Grid>
                  <Grid item xs={labelSize}>
                    <Typography className={classes.label}>PHONE NUMBER</Typography>
                  </Grid>
                  <Grid item className={`${classes.textboxContainer}`} justify="flex-end" xs={textboxSize}>
                    <TextField
                      className={`${classes.textbox}`}
                      size="medium"
                      id="phone"
                      name="phone"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.phone}
                    ></TextField>
                  </Grid>
                  <Grid item xs={labelSize}>
                    <Typography className={classes.label}>Where you live</Typography>
                  </Grid>
                  <Grid item className={`${classes.textboxContainer}`} justify="flex-end" xs={textboxSize}>
                    <TextField
                      className={`${classes.textbox}`}
                      id="address"
                      size="medium"
                      name="address"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      placeholder="Toronto, Ontario"
                      value={props.values.address}
                    ></TextField>
                  </Grid>
                  <Grid item xs={labelSize}>
                    <Typography className={classes.label}>Description</Typography>
                  </Grid>
                  <Grid item className={`${classes.textboxContainer}`} justify="flex-end" xs={textboxSize}>
                    <TextField
                      className={` ${classes.textbox}`}
                      multiline
                      id="description"
                      name="description"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      rows={4}
                      value={props.values.description}
                    ></TextField>
                  </Grid>
                  <Grid container justify="center">
                    <Button className={classes.button} color="secondary" size="large" variant="contained" type="submit">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    );
  }
}
