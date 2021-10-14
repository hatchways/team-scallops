import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import useStyles from './useStyles';

export default function ProfileMenu(): JSX.Element {
  const classes = useStyles();

  return (
    <Typography>
      <Grid item className={classes.menu}>
        <NavLink activeClassName={classes.active} className={classes.link} to="/profile/edit">
          Edit profile
        </NavLink>
        <NavLink activeClassName={classes.active} className={classes.link} to="/profile/photo">
          Profile photo
        </NavLink>
        <NavLink activeClassName={classes.active} className={classes.link} to="/profile/availability">
          Availability
        </NavLink>
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
    </Typography>
  );
}
