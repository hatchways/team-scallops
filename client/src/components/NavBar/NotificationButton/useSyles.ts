import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
  }),
);
export default useStyles;
