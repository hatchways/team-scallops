import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  typography: {
    flexGrow: 1,
    align: 'center',
  },
  title: {
    fontWeight: 600,
    margin: '2em',
  },
  label: {
    whiteSpace: 'nowrap',
    textAlign: 'right',
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: '.6rem',
    marginBottom: '1em',
  },
  textboxContainer: {
    marginRight: '5em',
    marginBottom: '1em',
  },
  textbox: {
    width: '30vw',
  },
}));

export default useStyles;
