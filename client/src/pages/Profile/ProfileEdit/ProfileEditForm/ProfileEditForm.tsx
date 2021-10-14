import { Typography, Button, TextField, Box, CircularProgress, Grid } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';

import { useAuth } from '../../../../context/useAuthContext';

//This for needs to UPDATE to /profile/edit/update

export default function ProfileEditForm(): JSX.Element {
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined) return <CircularProgress />;
  {
    console.log(loggedInUser);
  }
  if (!loggedInUser) {
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container justify="center">
      <form>
        <Grid item>
          <Typography variant="h4"> Edit Profile</Typography>
        </Grid>
        <Grid item>
          <label>
            first name<TextField variant="outlined" type="text" value={loggedInUser.username}></TextField>
          </label>
        </Grid>
        <Grid item>
          <label>
            last name<TextField variant="outlined" type="text" value={loggedInUser.username}></TextField>
          </label>
        </Grid>
        <Grid item>
          <label>
            Gender<TextField variant="outlined" type="text" value={loggedInUser.username}></TextField>
          </label>
        </Grid>
        <Grid item>
          <label>
            Birth Date<TextField variant="outlined" type="text" value={loggedInUser.username}></TextField>
          </label>
        </Grid>
        <Grid item>
          <label>
            Email Address<TextField variant="outlined" type="text" value={loggedInUser.username}></TextField>
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
    </Grid>
  );
}
