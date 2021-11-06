import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    // backgroundColor: 'blue',
  },
  heading: {
    fontWeight: 900,
    width: '100%',
    margin: '1rem 0',
  },
  subheading: {
    marginTop: '1rem',
    width: '100%',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.grey[400],
  },
  cardContainer: {
    // backgroundColor: 'red',
    margin: '2rem 0',
    borderRadius: theme.shape.borderRadius,
    width: '75%',
    height: '350px',
    overflow: 'auto',
  },
  card: {
    border: `1px solid gray`,
    margin: '0.5rem',
    width: '300px',
    height: '200px',
    // backgroundColor: 'green',
    '&:hover': { cursor: 'pointer' },
    borderRadius: theme.shape.borderRadius,
  },
  bold: {
    marginTop: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
  light: {
    color: theme.palette.grey[400],
  },
  image: {
    height: '80px',
    width: '80px',
    objectFit: 'contain',
  },
  form: {
    width: '50%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  formButton: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
