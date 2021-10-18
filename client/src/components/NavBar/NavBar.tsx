import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

// Context APIs
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';

// Material
import {
  Toolbar,
  AppBar,
  Box,
  CircularProgress,
  Typography,
  Button,
  Badge,
  Link as MaterialLink,
} from '@material-ui/core';
import { Notifications } from '@material-ui/icons';

// Supporting
import AuthMenu from '../AuthMenu/AuthMenu';
import Logo from '../../Images/logo.png';

// Styles
import useStyles from './useStyles';

function LoggedInBar({ classes, loggedInUser }: any): JSX.Element {
  return (
    <Box>
      <NavLink to="/dashboard" className={classes.link}>
        <Button className={classes.menuBarButton}>
          <Badge color="primary" variant="dot">
            <Typography variant="h6" color="textPrimary" className={`${classes.menuBarText} ${classes.mobileView}`}>
              Notifications
            </Typography>
            <Notifications className={`${classes.desktopView}`} />
          </Badge>
        </Button>
      </NavLink>
      {loggedInUser.isSitter ? (
        <NavLink to="/my-jobs" className={`${classes.link} ${classes.mobileView}`}>
          <Button className={classes.menuBarButton}>
            <Typography variant="h6" color="textPrimary" className={classes.menuBarText}>
              My Jobs
            </Typography>
          </Button>
        </NavLink>
      ) : (
        <NavLink to="/my-sitters" className={`${classes.link} ${classes.mobileView}`}>
          <Button className={classes.menuBarButton}>
            <Typography variant="h6" color="textPrimary" className={classes.menuBarText}>
              My Sitters
            </Typography>
          </Button>
        </NavLink>
      )}

      <NavLink to="/messages" className={`${classes.link} ${classes.mobileView}`}>
        <Button className={classes.menuBarButton}>
          <Badge color="primary" variant="dot">
            <Typography variant="h6" color="textPrimary" className={classes.menuBarText}>
              Messages
            </Typography>
          </Badge>
        </Button>
      </NavLink>
      <AuthMenu />
    </Box>
  );
}

function LoginBar({ classes }: any): JSX.Element {
  return (
    <Box>
      <MaterialLink href="/dashboard" color="textPrimary" className={classes.sitterText} underline="always">
        BECOME A DOG SITTER
      </MaterialLink>
      <NavLink to="/login" className={classes.link}>
        <Button variant="outlined" size="large" color="secondary" className={classes.menuBarButton}>
          <Typography variant="h6" color="inherit" style={{ fontWeight: 'bold' }}>
            Login
          </Typography>
        </Button>
      </NavLink>
      <NavLink to="/signup" className={classes.link}>
        <Button variant="contained" size="large" color="secondary" className={classes.menuBarButton}>
          <Typography variant="h6" color="inherit" className={classes.menuBarText}>
            SignUp
          </Typography>
        </Button>
      </NavLink>
    </Box>
  );
}

export default function NavBar(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const classes = useStyles();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;

  return (
    <>
      <CssBaseline />
      <AppBar elevation={3} position="static" className={`${loggedInUser ? classes.appBarLoggedIn : classes.appBar}`}>
        <Toolbar style={{ height: '100%' }}>
          <NavLink to={loggedInUser ? '/dashboard' : '/login'}>
            <img src={Logo} alt="logo" className={classes.logo} />
          </NavLink>
          <Box style={{ flexGrow: 1 }} />
          <Box>
            {loggedInUser ? (
              <LoggedInBar classes={classes} loggedInUser={loggedInUser} />
            ) : (
              <LoginBar classes={classes} />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
