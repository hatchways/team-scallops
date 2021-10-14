import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  menu: { paddingTop: '2em' },
  link: {
    width: '20vw',
    paddingLeft: '4vw',
    maxHeight: '100vh',
    fontSize: '1em',
    color: 'grey',
    paddingTop: '.5em',
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
