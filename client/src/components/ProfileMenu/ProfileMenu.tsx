import { Grid, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';

export default function ProfileMenu(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  if (!loggedInUser) return <></>;
  return (
    <Box>
      <Grid item className={classes.menu}>
        <NavLink activeClassName={classes.active} className={classes.link} to="/profile/edit">
          Edit profile
        </NavLink>
        <NavLink activeClassName={classes.active} className={classes.link} to="/profile/photo">
          Profile photo
        </NavLink>
        {loggedInUser.isSitter && (
          <NavLink activeClassName={classes.active} className={classes.link} to="/profile/availability">
            Availability
          </NavLink>
        )}
        <NavLink activeClassName={classes.active} className={classes.link} to="/profile/payment">
          Payment
        </NavLink>
        <NavLink activeClassName={classes.active} className={classes.link} to="/profile/security">
          Security
        </NavLink>
        <NavLink activeClassName={classes.active} className={classes.link} to="/profile/settings">
          Settings
        </NavLink>
      </Grid>
    </Box>
  );
}
