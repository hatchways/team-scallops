import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: 100,
    backgroundColor: 'transparent',
  },
  appBarLoggedIn: {
    height: 100,
    backgroundColor: '#fff',
  },
  logo: {
    maxWidth: 200,
  },
  link: {
    textDecoration: 'none',
  },
  sitterText: {
    fontFamily: theme.typography.fontFamily,
    marginRight: '2rem',
    fontWeight: 'bold',
  },
  menuBarButton: {
    marginRight: '2rem',
  },
  mobileView: {
    [theme.breakpoints.down(600)]: {
      display: 'none',
    },
  },
  desktopView: {
    [theme.breakpoints.up(600)]: {
      display: 'none',
    },
  },
}));

export default useStyles;
