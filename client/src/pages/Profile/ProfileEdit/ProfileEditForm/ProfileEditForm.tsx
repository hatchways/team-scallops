import { Button, TextField, Box } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { CircularProgress } from '@material-ui/core';

import { useAuth } from '../../../../context/useAuthContext';

//This for needs to UPDATE to /profile/edit/update

export default function ProfileEditForm(): JSX.Element {
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined) return <CircularProgress />;

  if (!loggedInUser) {
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <form>
      <input type="text" value={loggedInUser.username}></input>
    </form>
  );
}
