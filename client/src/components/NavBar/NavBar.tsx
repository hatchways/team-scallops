import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
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
import AuthMenu from '../AuthMenu/AuthMenu';
import Logo from '../../Images/logo.png';
import useStyles from './useStyles';
import NotificationButton from './NotificationButton/NotificationButton';

function LoggedInBar({ classes, loggedInUser }: any): JSX.Element {
  return (
    <Box display="flex" alignItems="center">
      <NotificationButton />

      <Button
        component={NavLink}
        to={loggedInUser.isSitter ? '/my-jobs' : 'my-sitters'}
        className={`${classes.menuBarButton} ${classes.mobileView}`}
      >
        <Typography variant="h6" color="textPrimary" className={classes.menuBarText}>
          {loggedInUser.isSitter ? 'My Jobs' : 'My Sitters'}
        </Typography>
      </Button>
      <Button component={NavLink} to="/messages" className={`${classes.menuBarButton} ${classes.mobileView}`}>
        <Badge color="primary" variant="dot">
          <Typography variant="h6" color="textPrimary" className={classes.menuBarText}>
            Messages
          </Typography>
        </Badge>
      </Button>
      <AuthMenu />
    </Box>
  );
}

function LoginBar({ classes }: any): JSX.Element {
  return (
    <Box>
      <MaterialLink href="/dashboard" color="textPrimary" className={classes.sitterText} underline="always">
        Become a Dog Sitter
      </MaterialLink>
      <Button
        component={NavLink}
        to="/login"
        variant="outlined"
        size="large"
        color="secondary"
        className={classes.menuBarButton}
      >
        <Typography variant="h6" color="inherit" style={{ fontWeight: 'bold' }}>
          Login
        </Typography>
      </Button>
      <Button
        component={NavLink}
        to="/signup"
        variant="contained"
        size="large"
        color="secondary"
        className={classes.menuBarButton}
      >
        <Typography variant="h6" color="inherit" className={classes.menuBarText}>
          SignUp
        </Typography>
      </Button>
    </Box>
  );
}

export default function NavBar(): JSX.Element {
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  if (loggedInUser === undefined) return <CircularProgress />;

  return (
    <>
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
