import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  demo: {
    margin: theme.spacing(0, 2, 0),
    padding: 18,
    marginTop: 18,
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontWeight: 'bold',
    marginTop: 16,
  },
}));

export default useStyles;
