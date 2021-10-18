import { Typography, Button, TextField, Box, CircularProgress, Grid } from '@material-ui/core';
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
              phone: state.phone,
              address: state.address,
              description: state.description,
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                if (!hasProfile) {
                  console.log('creating profile');
                  axios
                    .post('/profile/create', values)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  console.log('updating profile');

                  axios
                    .post('/profile/update', values)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
                alert(JSON.stringify(values, null, 2));
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
                    <TextField
                      className={`${classes.textbox}`}
                      size="medium"
                      id="gender"
                      name="gender"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.gender}
                    ></TextField>
                  </Grid>
                  <Grid item xs={labelSize}>
                    <Typography className={classes.label}>Birthday</Typography>
                  </Grid>
                  <Grid item className={`${classes.textboxContainer}`} justify="flex-end" xs={textboxSize}>
                    <TextField
                      className={`${classes.textbox}`}
                      size="medium"
                      id="birthday"
                      name="birthday"
                      onChange={props.handleChange}
                      variant="outlined"
                      type="text"
                      value={props.values.birthday}
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
