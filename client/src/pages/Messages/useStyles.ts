import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  conversationBody: {
    height: 'calc(100vh - 100px);',
    overflow: 'hidden',
  },
  sideBar: {
    height: '100%',
    border: '1px solid #EEEEEE',
  },
  sideBarInactive: {
    height: '100%',
    display: 'flex',
    alignItems: ' center',
    justifyContent: 'space-around',
  },
}));

export default useStyles;
