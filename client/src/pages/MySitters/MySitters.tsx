import { Box, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/useAuthContext';

import useStyles from './useStyles';

const Profile = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const history = useHistory();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
  }

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h5" align="center">
          My Sitters Page To be here!!
        </Typography>
      </Box>
    </>
  );
};

export default Profile;
