import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles((theme) => ({
  appBar: {
    height: 80,
    backgroundColor: 'transparent',
  },
  appBarLoggedIn: {
    height: 100,
    backgroundColor: '#fff',
  },
  logo: {
    maxWidth: 200,
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
export const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      background: 'green',
    },
  }),
)(Badge);

export default useStyles;
