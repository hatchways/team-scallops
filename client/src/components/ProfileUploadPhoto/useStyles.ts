import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 645,
      margin: '2rem auto',
    },

    card: {
      height: '25rem',
      width: '30rem',
      margin: '3rem',
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
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }),
);
