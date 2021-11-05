import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  inputForm: {
    width: '100%',
    maxHeight: '6rem',
    height: '6rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderTop: '1px solid #EEEEEE',
  },
  inputMessage: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    flex: 1,
  },
  sendButton: {
    fontSize: '1.2rem',
    width: '6rem',
    height: '3rem',
    padding: '1rem',
  },
}));

export default useStyles;
