import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
    placeItems: 'center',
  },
  title: {
    padding: theme.spacing(2),
    fontSize: 14,
  },
}));

export default useStyles;
