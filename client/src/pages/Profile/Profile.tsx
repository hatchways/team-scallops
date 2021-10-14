import { Grid, Paper } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { Route } from 'react-router-dom';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import ProfileEdit from './ProfileEdit/ProfileEdit';

export default function Profile(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={`${classes.root}`}>
      <Grid container spacing={2} className={`${classes.profile}`}>
        <CssBaseline />
        {/*the side menu bar */}
        <Grid item xs={2}>
          <ProfileMenu />
        </Grid>
        {/*Routes and component definitions */}
        <Grid item xs={8}>
          <Paper className={`${classes.paper}`}>
            <Route path="/profile/edit" component={ProfileEdit} />
            <Route path="/profile/photo" />
            <Route path="/profile/availability" />
            <Route path="/profile/payment" />
            <Route path="/profile/security" />
            <Route path="/profile/settings" />
            <Route exact path="/profile">
              <p>Profie page(Not implimented)</p>
            </Route>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
