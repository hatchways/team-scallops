import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
  },
  profile: {
    padding: '5em',
    minHeight: '100vh',
    backgroundColor: '#F0F0F0',
  },
  paper: {
    height: '80vh',
  },
}));

export default useStyles;
