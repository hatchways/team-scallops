import { Typography, Button, TextField, Box, CircularProgress, Grid } from '@material-ui/core';
import { Formik, FormikHelpers, useFormik, validateYupSchema } from 'formik';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../context/useAuthContext';

//This form needs to UPDATE to /profile/edit/update

export default function ProfileEditForm(): JSX.Element {
  const { loggedInUser } = useAuth();
  const [state, setState] = useState();
  const [hasProfile, setHasProfile] = useState(false);
  useEffect(() => {
    //get the data from profile
    async function fetchProfile() {
      const response = await axios
        .get('/profile')
        .then((response) => {
          console.log(response.data);
          setHasProfile(true);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setHasProfile(false);
        });
    }
    fetchProfile();
  }, []);

  if (loggedInUser === undefined) return <CircularProgress />;
  {
    console.log(loggedInUser);
  }
  if (!loggedInUser) {
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  } else {
    return (
      <Grid container justify="center">
        <Typography variant="h4"> Edit Profile</Typography>
        {console.log(hasProfile)}

        <Formik
          enableReinitialize={true}
          initialValues={{ firstName: '', lastName: '', email: '', userName: '', gender: '' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <form>
              <Grid item>
                <label>
                  first name
                  <TextField
                    id="firstName"
                    name="firstName"
                    onChange={props.handleChange}
                    variant="outlined"
                    type="text"
                    value={props.values.firstName}
                  ></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  last name
                  <TextField
                    id="lastName"
                    name="lastName"
                    onChange={props.handleChange}
                    variant="outlined"
                    type="text"
                    value={props.values.lastName}
                  ></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  Gender
                  <TextField
                    id="gender"
                    name="gender"
                    onChange={props.handleChange}
                    variant="outlined"
                    type="text"
                    value={props.values.gender}
                  ></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  Birth Date<TextField variant="outlined" type="text" value={loggedInUser.username}></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  Email Address<TextField variant="outlined" type="text" value={loggedInUser.email}></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  Phone Number<TextField variant="outlined" type="text" value={loggedInUser.username}></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  Where you live<TextField variant="outlined" type="text" value={loggedInUser.username}></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  Description<TextField variant="outlined" type="text" value={loggedInUser.username}></TextField>
                </label>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    );
  }
}
