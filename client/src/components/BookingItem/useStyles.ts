import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pos: {
    marginBottom: 18,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  details: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;
