import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useState, useEffect } from 'react';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';
import { Button } from '@material-ui/core';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  const [uploadPhoto, setUploadPhoto] = useState(false);

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />

      <Grid item className={classes.drawerWrapper}>
        <ChatSideBanner loggedInUser={loggedInUser} />
      </Grid>
      <Grid>
        <Button color="secondary" onClick={() => setUploadPhoto(!uploadPhoto)}>
          Profile Photos
        </Button>
      </Grid>
      <Grid>{uploadPhoto && <UploadPhoto />}</Grid>
    </Grid>
  );
}
