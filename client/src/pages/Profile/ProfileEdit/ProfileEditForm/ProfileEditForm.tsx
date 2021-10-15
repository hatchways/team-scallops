import { Typography, Button, TextField, Box, CircularProgress, Grid } from '@material-ui/core';
import { Formik, FormikHelpers, useFormik, validateYupSchema } from 'formik';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../context/useAuthContext';

//This form needs to UPDATE to /profile/edit/update

export default function ProfileEditForm(): JSX.Element {
  const { loggedInUser } = useAuth();
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

  const [hasProfile, setHasProfile] = useState(false);

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
        <Typography variant="h4"> Edit Profile</Typography>

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
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
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
                  Birth Date
                  <TextField
                    id=""
                    name=""
                    onChange={props.handleChange}
                    variant="outlined"
                    type="text"
                    value={props.values.birthday}
                  ></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  Email Address
                  <TextField
                    id=""
                    name=""
                    onChange={props.handleChange}
                    variant="outlined"
                    type="text"
                    value={props.values.email}
                  ></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  Phone Number
                  <TextField
                    id=""
                    name=""
                    onChange={props.handleChange}
                    variant="outlined"
                    type="text"
                    value={props.values.phone}
                  ></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  Where you live
                  <TextField
                    id=""
                    name=""
                    onChange={props.handleChange}
                    variant="outlined"
                    type="text"
                    value={props.values.address}
                  ></TextField>
                </label>
              </Grid>
              <Grid item>
                <label>
                  Description
                  <TextField
                    id=""
                    name=""
                    onChange={props.handleChange}
                    variant="outlined"
                    type="text"
                    value={props.values.description}
                  ></TextField>
                </label>
              </Grid>
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </Grid>
    );
  }
}
