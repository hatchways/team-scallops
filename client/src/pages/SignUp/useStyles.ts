import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  wrapper: {
    height: '80vh',
    minHeight: '40rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexDirection: 'column',
  },
  title: {
    fontSize: 32,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 900,
    fontFamily: theme.typography.fontFamily,
  },
}));

export default useStyles;
