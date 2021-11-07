import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  media: {
    position: 'relative',
    zIndex: 1,
  },
  coverPhoto: {
    height: 240,
  },
  profilePhoto: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.spacing(20),
    height: theme.spacing(20),
    zIndex: 2,
    top: 140,
    right: 60,
    left: 60,
    border: '8px solid white',
  },
  locationIcon: {
    marginRight: theme.spacing(1),
  },
  profileDetail: {
    paddingTop: theme.spacing(10),
  },
  request: {
    display: 'grid',
    justifyContent: 'center',
    paddingTop: theme.spacing(8),
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    padding: 18,
  },
  datesBox: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  datesTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  actionsBox: {
    display: 'grid',
    justifyContent: 'center',
    margin: 54,
  },
  actions: {
    backgroundColor: '#ff4545',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    textTransform: 'uppercase',
  },
  reviewsContainer: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
