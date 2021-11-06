import useStyles from './useStyles';
import AvatarDisplay from '../../AvatarDisplay/AvatarDisplay';
import { Box, Typography } from '@material-ui/core';
import { Conversation, Message } from '../../../interface/Conversation';
import { useActiveConversation } from '../../../context/useActiveConversationContext';
import { useAuth } from '../../../context/useAuthContext';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSocket } from '../../../context/useSocketContext';
import clsx from 'clsx';
interface Props {
  conversation: Conversation;
  onlineUsers: Record<string, string>;
}

const SideBannerItem = ({ conversation, onlineUsers }: Props): JSX.Element => {
  const classes = useStyles();
  const { activeConversation, updateActiveConversation } = useActiveConversation();
  const [lastMessage, SetLastMessage] = useState<Message | null>(null);
  const { loggedInUser } = useAuth();
  const { socket } = useSocket();
  const otherUser = loggedInUser?.id === conversation.firstUser._id ? conversation.secondUser : conversation.firstUser;
  let isUserOnline = false;
  if (!!otherUser?._id && otherUser?._id in onlineUsers) {
    isUserOnline = true;
  }

  const setCurrentConverstion = () => {
    updateActiveConversation(conversation);
  };

  useEffect(() => {
    const lastMessageListener = (message: Message) => {
      if (!message.sender || !message.text || !message.conversation) return;
      if (message.conversation === conversation._id) {
        SetLastMessage(message);
      }
    };

    SetLastMessage((prev) => (prev?.text === conversation.lastMessage.text ? prev : conversation.lastMessage));
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
      className={clsx({
        [classes.conversationBox]: true,
        [classes.activeConversationBox]: activeConversation?._id === conversation._id,
      })}
    >
      <Box className={classes.userAvatarBox}>
        <AvatarDisplay loggedIn user={otherUser} />
        {isUserOnline ? <Box className={classes.userOnline}></Box> : ''}
      </Box>
      <Box className={classes.userNameBox}>
        <Typography className={classes.userName}>{otherUser?.username}</Typography>
        <Typography className={classes.userLastMessage}>{lastMessage?.text}</Typography>
      </Box>
      <Box className={classes.userMessageDate}>
        <Typography>{moment(lastMessage?.updatedAt).fromNow()}</Typography>
      </Box>
    </Box>
  );
};

export default SideBannerItem;
