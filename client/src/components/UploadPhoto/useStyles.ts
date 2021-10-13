import { makeStyles, Theme, createStyles, createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 645,
      //height: 400,
      margin: '2rem auto',
    },

    media: {
      height: '100px',
      width: '100px',
      borderRadius: '50px',
      //marginTop: '1rem',
    },
    card: {
      height: '25rem',
      margin: '3rem',
    },
    mr1: {
      marginRight: '0.5rem',
    },
    padding2: {
      padding: '1rem 3rem',
    },
    fontWeight900: {
      fontWeight: 900,
    },
    opacity: {
      opacity: 0.6,
    },
    width12: {
      width: '12rem',
      textAlign: 'center',
    },
    input: {
      display: 'none',
    },
  }),
);
