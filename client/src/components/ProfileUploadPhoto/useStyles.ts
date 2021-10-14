import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 645,
      margin: '2rem auto',
    },

    media: {
      height: '100px',
      width: '100px',
      borderRadius: '50px',
    },
    card: {
      height: '25rem',
      width: '30rem',
      margin: '3rem',
    },
    mr1: {
      marginRight: '0.5rem',
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
  }),
);
