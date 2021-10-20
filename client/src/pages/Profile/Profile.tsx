import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';

const Profile = (): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h5" align="center">
          Profile Page To be here!!
        </Typography>
      </Box>
    </>
  );
};

export default Profile;
