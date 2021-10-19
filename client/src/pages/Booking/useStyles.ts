import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
    placeItems: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    padding: theme.spacing(2),
    fontSize: 14,
  },
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
  selectedDay: {
    '& .MuiButtonBase-root': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiTypography-root': {
        color: theme.palette.common.white,
      },
    },
  },
  upcomingBookingFormat: {
    width: '35px',
    height: '35px',
    color: 'white',
    backgroundColor: '#f04545',
  },
}));

export default useStyles;
