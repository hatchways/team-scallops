import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  conversationBox: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#E5E5E5',
    },
    padding: '1rem',
    borderBottom: '1px solid #EEEEEE',
  },
  activeConversationBox: {
    backgroundColor: '#E5E5E5',
  },
  userAvatarBox: {
    flex: 1,
    position: 'relative',
  },
  userNameBox: {
    flex: 5,
    overflow: 'hidden',
    padding: '0 0.5rem',
  },
  userName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  userLastMessage: {
    maxHeight: '1rem',
    textOverflow: 'ellipsis',
    color: 'gray',
    overflow: 'hidden',
  },
  userMessageDate: {
    flex: 3,
    color: 'gray',
  },
  userSubtitle: {
    color: 'gray',
    margin: 'none',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: '50%',
  },
  userOnline: {
    width: 10,
    height: 10,
    position: 'absolute',
    background: '#5DFC0A',
    top: 5,
    right: 5,
    borderRadius: '50%',
  },
  newMessages: {
    width: 10,
    height: 10,
    position: 'absolute',
    background: 'red',
    top: 5,
    right: 10,
    borderRadius: '5',
  },
}));

export default useStyles;
