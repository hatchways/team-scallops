import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  menu: {
    padding: '3em',
  },
  link: {
    width: '20vw',
    maxHeight: '100vh',
    fontSize: '1em',
    color: 'grey',
    padding: '.5em',
    display: 'block',
    '&:hover': {
      color: 'black',
    },
    '&:selected': {
      color: 'black',
    },
    textDecoration: 'none',
    textAlign: 'left',
  },
  active: {
    color: 'black',
  },
}));

export default useStyles;
