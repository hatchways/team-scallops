import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
    width: '100%',
    margin: '1rem 0',
  },
  subheading: {
    marginTop: '1rem',
    marginLeft: '2rem',
    width: '100%',
    fontWeight: theme.typography.fontWeightBold,
    color: '#BEBEBE',
  },
  cardContainer: {
    margin: '2rem 0',
    borderRadius: theme.shape.borderRadius,
    width: '75%',
    minHeight: '350px',
  },
  card: {
    border: `1px solid #E4E4E4`,
    padding: '0.5rem',
    margin: '1rem',
    width: '300px',
    height: '200px',
    '&:hover': { cursor: 'pointer' },
    borderRadius: theme.shape.borderRadius,
  },
  image: {
    height: '80px',
    width: '80px',
    objectFit: 'contain',
  },
  cardNumber: {
    marginTop: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
  expDate: {
    color: '#BEBEBE',
  },
  cardName: {
    marginTop: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
  form: {
    width: '50%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  cardHolder: {
    marginBottom: '1rem',
  },
  formButton: {
    marginTop: '1rem',
    marginLeft: '2rem',
  },
}));

export default useStyles;
