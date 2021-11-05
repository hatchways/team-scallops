import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: theme.spacing(4),
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
    width: '100%',
    margin: '2rem 0',
  },
  subheading: {
    width: '100%',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.grey[400],
  },
  cardContainer: {
    margin: '2rem 0',
    borderRadius: theme.shape.borderRadius,
    width: '90%',
    height: '300px',
    overflow: 'auto',
  },
  card: {
    border: `2px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    width: '300px',
    minHeight: '200px',
    height: 'min-content',
    backgroundColor: 'green',
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
    height: '50px',
    width: '100px',
    objectFit: 'cover',
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
