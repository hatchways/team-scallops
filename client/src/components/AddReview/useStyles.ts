import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  reviewContainer: {
    height: '15rem',
    padding: '1rem',
  },
  reviewHeading: {
    alignSelf: 'flex-start',
    marginBottom: '1rem',
  },
  reviewRating: {
    marginTop: '1rem',
  },
  reviewSubmit: {
    margin: '1rem 0',
  },
}));

export default useStyles;
