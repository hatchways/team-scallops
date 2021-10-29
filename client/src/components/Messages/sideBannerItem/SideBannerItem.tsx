import useStyles from './useStyles';
import AvatarDisplay from '../../AvatarDisplay/AvatarDisplay';
import { Box, Typography } from '@material-ui/core';
import { Conversation } from '../../../interface/Conversation';
import { useActiveConversation } from '../../../context/useActiveConversationContext';
import { useAuth } from '../../../context/useAuthContext';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSocket } from '../../../context/useSocketContext';
interface Props {
  conversation: Conversation;
  onlineUsers: Record<string, string>;
}

const SideBannerItem = ({ conversation, onlineUsers }: Props): JSX.Element => {
  const classes = useStyles();
  const { activeConversation, updateActiveConversation } = useActiveConversation();
  const [lastMessage, SetLastMessage] = useState<string | null>(null);
  const { loggedInUser } = useAuth();
  const { socket } = useSocket();
  const otherUser = loggedInUser?.id === conversation.firstUser._id ? conversation.secondUser : conversation.firstUser;
  let isUserOnline = false;
  if (otherUser?._id && otherUser?._id in onlineUsers) {
    isUserOnline = true;
  }

  const setCurrentConverstion = () => {
    updateActiveConversation(conversation);
  };

  useEffect(() => {
    const lastMessageListener = (resConversation: Conversation, sender: string, text: string) => {
      if (!sender || !text || !resConversation) return;
      if (resConversation._id === conversation._id) {
        SetLastMessage(text);
      }
    };

    SetLastMessage((prev) => (prev === conversation.lastMessage.text ? prev : conversation.lastMessage.text));
    socket?.on('newMessage', lastMessageListener);
    return () => {
      socket?.off('newMessage', lastMessageListener);
    };
  }, [socket, conversation]);

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
      {console.log('User is: ' + isUserOnline)}
      <Box className={classes.userAvatarBox}>
        <AvatarDisplay loggedIn user={otherUser} />
        {isUserOnline ? <Box className={classes.userOnline}></Box> : ''}
      </Box>
      <Box className={classes.userNameBox}>
        <Typography className={classes.userName}>{otherUser?.username}</Typography>
        <Typography className={classes.userLastMessage}>{lastMessage}</Typography>
      </Box>
      <Box className={classes.userMessageDate}>
        <Typography>{moment(conversation.updatedAt).fromNow()}</Typography>
      </Box>
    </Box>
  );
};

export default SideBannerItem;
