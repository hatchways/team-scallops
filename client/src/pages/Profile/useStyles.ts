import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    overflow: 'hidden',
  },
  profile: {
    paddingTop: '5em',
    minHeight: '100vh',
    backgroundColor: '#F0F0F0',
    margin: '0',
  },
  paper: {
    minHeight: '70vh',
    padding: '1em',
  },
}));

export default useStyles;
