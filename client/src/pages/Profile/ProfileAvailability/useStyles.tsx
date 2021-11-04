import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 6),
  },
  dayText: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  availability: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    alignItems: 'center',
  },
  dateRange: {
    fontSize: 'large',
  },
  datePicker: {
    zIndex: 10,
    position: 'absolute',
    display: 'inline-grid',
  },
  content: {
    margin: theme.spacing(0, 4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 160,
  },
  time: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;
