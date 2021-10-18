import { Typography, Button, TextField, Select, CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../context/useAuthContext';
import useStyles from './useStyles';

export default function ProfileEditForm(): JSX.Element {
  const { loggedInUser } = useAuth();
  const [hasProfile, setHasProfile] = useState(false);
  const classes = useStyles();
  const textboxSize = 7;
  const labelSize = 3;
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    birthday: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    phone: '',
    address: '',
    description: '',
  });

  useEffect(() => {
    async function fetchProfile() {
      await axios
        .get('/profile')
        .then((response: any) => {
          if (typeof response.data.profile === 'object') {
            const profile = response.data.profile;
            if (profile === null) {
              setHasProfile(false);
            } else {
              setState(profile);
              setHasProfile(true);
            }
          }
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setHasProfile(false);
        });
    }
    fetchProfile();
  }, []);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  } else {
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
              dobDay: state.birthday.slice(8, 10),
              dobMonth: state.birthday.slice(5, 7),
              dobYear: state.birthday.slice(0, 4),
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

              setTimeout(() => {
                if (!hasProfile) {
                  console.log('creating profile');
                  axios
                    .post('/profile/create', modifiedValues)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  console.log('updating profile');

                  axios
                    .post('/profile/update', modifiedValues)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
                alert(JSON.stringify(modifiedValues, null, 2));
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
                    <TextField
                      className={`${classes.birthday}`}
                      size="medium"
                      id="dobDay"
                      name="dobDay"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.dobDay}
                    ></TextField>
                    <TextField
                      className={`${classes.birthday}`}
                      size="medium"
                      id="dobMonth"
                      name="dobMonth"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.dobMonth}
                    ></TextField>
                    <TextField
                      className={`${classes.birthday}`}
                      size="medium"
                      id="dobYear"
                      name="dobYear"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.dobYear}
                    ></TextField>
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
                      value={props.values.address}
                    ></TextField>
                  </Grid>
                  <Grid item xs={labelSize}>
                    <Typography className={classes.label}>Description</Typography>
                  </Grid>
                  <Grid item className={`${classes.textboxContainer}`} justify="flex-end" xs={textboxSize}>
                    <TextField
                      className={`${classes.textbox}`}
                      multiline
                      id="description"
                      name="description"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.description}
                    ></TextField>
                  </Grid>
                  <Grid container justify="center">
                    <Button color="secondary" size="large" variant="contained" type="submit">
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
