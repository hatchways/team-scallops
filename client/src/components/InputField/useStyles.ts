import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    textTransform: 'uppercase',
    position: 'relative',
    top: '1rem',
    fontWeight: 900,
  },
  inputs: {
    height: '1rem',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  circleColor: {
    color: 'white',
  },
  width50: {
    width: '45%',
  },
}));

export default useStyles;
