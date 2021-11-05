import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    menuBarButton: {
      marginRight: '2rem',
    },
    mobileView: {
      [theme.breakpoints.down(600)]: {
        display: 'none',
      },
    },
    greenColor: {
      background: '#4CFF33',
    },
    margin2: {
      margin: '2rem',
    },
  }),
);

export const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      background: 'green',
    },
  }),
)(Badge);
export default useStyles;
