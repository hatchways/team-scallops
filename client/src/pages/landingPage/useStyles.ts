import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
  },
  image: {
    backgroundImage: 'url(/33.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(5, 10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flexStart',
  },

  form: {
    width: '70%',
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2, 6),
    background: '#f54242',
    minWidth: '4rem',
  },
  fontBold: {
    fontWeight: 'bold',
  },
  width50: {
    width: '50%',
  },
}));
