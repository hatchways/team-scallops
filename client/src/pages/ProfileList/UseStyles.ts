import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: '10vw',
    paddingRight: '10vw',
  },
  card: {
    paddingTop: '2em',
    paddingBottom: '2em',
    textAlign: 'center',
  },
  search: {
    borderLeft: '2px solid grey',
    height: '100%',
  },
  date: {
    borderLeft: '1px !important',
    borderColor: 'black',
  },
  bottom: {
    marginBottom: '.5em',
    maxHeight: '1em',
  },
  avatar: {
    height: '6em',
    width: '6em',
  },
  searchContainer: {
    marginTop: '20vh',
    marginBottom: '5vh',
  },
  datePicker: {
    zIndex: 10,
    position: 'absolute',
  },
  searchbar: {
    marginTop: '1em',
  },
}));

export default useStyles;
