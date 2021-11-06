import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    paddingTop: '2em',
    paddingBottom: '2em',
    textAlign: 'center',
  },
  date: {
    borderLeft: '1px !important',
    borderColor: 'black',
  },
  bottom: {},
  avatar: {
    height: '6em',
    width: '6em',
  },
  location: {
    padding: '1em',
    color: 'grey',
  },
  price: {
    padding: '1em',
    fontWeight: 900,
  },
  fullName: {
    fontWeight: 900,
  },
}));

export default useStyles;
