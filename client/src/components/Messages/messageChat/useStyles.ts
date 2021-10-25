import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  chatTitle: {
    padding: '0 2rem',
    height: 75,
    borderBottom: '1px solid #EEEEEE',
  },
  chatTitleUsername: {
    margin: '0px!important',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    paddingBottom: '1rem',
  },
  chatBoxWrapper: {
    height: 'calc(100vh - 175px);',
    padding: '0 2rem',
    overflowY: 'scroll',
  },
  chatContentBox: {
    minHeight: '100%',
    paddingTop: '1rem',
  },
  receiverLeftMessage: {
    display: 'flex',
    paddingBottom: '1rem',
  },
  senderRightMessage: {
    display: 'flex',
    paddingBottom: '1rem',
    marginLeft: 'auto',
  },
  userMessageBox: {
    wordBreak: 'break-word',
    maxWidth: '40vw',
    width: 'max-content',
    padding: '0px 1rem',
    borderRadius: '1rem',
  },
  grayUserMessages: {
    backgroundColor: '#EEEEEE',
  },
  messageText: {
    fontSize: '0.9rem',
    padding: '0.5rem',
  },
  sentTimeText: {
    color: 'gray',
    fontSize: '0.7rem',
  },
}));

export default useStyles;
