import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import SideBannerItem from '../sideBannerItem/SideBannerItem';
import { useConversation } from '../../../context/useConversationContext';
import { useSocket } from '../../../context/useSocketContext';
import { useEffect, useState } from 'react';

const ChatSideBanner = (): JSX.Element => {
  const classes = useStyles();
  const { conversations } = useConversation();
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    console.log('client all user emitted');
    const allUsersOnlineListener = (allUsersOnline: Record<string, string>) => {
      console.log('All users received');
      setOnlineUsers(allUsersOnline);
    };

    socket?.on('allUsersOnlineRes', allUsersOnlineListener);
    if (Object.keys(onlineUsers).length === 0) socket?.emit('allUsersOnline');
  }, [onlineUsers, socket]);

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" className={classes.chatSideBannerTitle}>
        <Typography variant={'h4'}>Inbox Messages</Typography>
      </Box>
      {!!conversations?.length &&
        conversations?.map((conversation) => (
          <SideBannerItem key={conversation._id} conversation={conversation} onlineUsers={onlineUsers} />
        ))}
    </Box>
  );
};

export default ChatSideBanner;
