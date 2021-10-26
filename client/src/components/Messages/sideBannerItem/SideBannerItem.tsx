import useStyles from './useStyles';
import AvatarDisplay from '../../AvatarDisplay/AvatarDisplay';
import { Box, Typography } from '@material-ui/core';
import { Conversation } from '../../../interface/Conversation';
import { useActiveConversation } from '../../../context/useActiveConversationContext';
import { useAuth } from '../../../context/useAuthContext';
import moment from 'moment';
interface Props {
  conversation: Conversation;
}

const SideBannerItem = ({ conversation }: Props): JSX.Element => {
  const classes = useStyles();
  const { activeConversation, updateActiveConversation } = useActiveConversation();
  const { loggedInUser } = useAuth();
  const isUserOnline = true;
  const otherUser = loggedInUser?.id === conversation.firstUser._id ? conversation.secondUser : conversation.firstUser;

  const setCurrentConverstion = () => {
    updateActiveConversation(conversation);
  };

  return (
    <Box
      onClick={setCurrentConverstion}
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={`${classes.conversationBox} ${
        activeConversation?._id === conversation._id && classes.activeConversationBox
      }`}
    >
      <Box className={classes.userAvatarBox}>
        <AvatarDisplay loggedIn user={otherUser} />
        {isUserOnline ? <Box className={classes.userOnline}></Box> : ''}
      </Box>
      <Box className={classes.userNameBox}>
        <Typography className={classes.userName}>{otherUser?.username}</Typography>
        <Typography className={classes.userLastMessage}>
          {conversation.lastMessage ? conversation.lastMessage.text : ''}
        </Typography>
      </Box>
      <Box className={classes.userMessageDate}>
        <Typography>{moment(conversation.updatedAt).fromNow()}</Typography>
      </Box>
    </Box>
  );
};

export default SideBannerItem;
