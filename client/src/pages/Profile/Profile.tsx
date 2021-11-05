import { Grid, Paper, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { Route, Switch } from 'react-router-dom';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import PaymentDetails from './ProfileEdit/PaymentDetails/PaymentDetails';

export default function Profile(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={`${classes.root}`}>
      <Grid container spacing={2} className={`${classes.profile}`}>
        <Grid item xs={2}>
          <ProfileMenu />
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Switch>
              <Route path="/profile/edit" component={ProfileEdit} />
              <Route path="/profile/photo" />
              <Route path="/profile/availability" />
              <Route path="/profile/payment" component={PaymentDetails} />
              <Route path="/profile/security" />
              <Route path="/profile/settings" />
              <Route exact path="/profile">
                <Typography>Profie page(Not implimented)</Typography>
              </Route>
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
