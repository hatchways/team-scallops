import React, { useEffect, useState } from 'react';
import useStyles from './useStyles';
import AvatarDisplay from '../../AvatarDisplay/AvatarDisplay';
import { Box, Typography } from '@material-ui/core';
import { Conversation } from '../../../interface/Conversation';
import { useConversation } from '../../../context/useConversationContext';
import { useActiveConversation } from '../../../context/useActiveConversationContext';
import { useSocket } from '../../../context/useSocketContext';
import { useAuth } from '../../../context/useAuthContext';
import moment from 'moment';
interface Props {
  conversation: Conversation;
}

// Check stupid mistakes

const SideBannerItem = ({ conversation }: Props): JSX.Element => {
  const classes = useStyles();
  const { updateActiveConversation } = useActiveConversation();
  const { updateConversationContext, conversations } = useConversation();
  const { loggedInUser } = useAuth();
  const otherUser = loggedInUser?._id === conversation.firstUser._id ? conversation.secondUser : loggedInUser;
  // const { socket } = useSocket();
  const [haveNewMessages, setHaveNewMessages] = useState(false);
  const setCurrentConverstion = () => {
    updateActiveConversation(conversation);
    setHaveNewMessages(false);
  };

  useEffect(() => {
    if (conversations?.length || !loggedInUser) return;
    // socket.on('updateCoversation', (updatedConversation: Conversation, senderId: string) => {
    //   if (senderId === loggedInUser._id) return;
    //   if (conversations && conversation._id === updatedConversation._id) {
    //     const updated = conversations.map((c) => (c._id === updatedConversation._id ? updatedConversation : c));
    //     updateConversationContext(updated);
    //     setHaveNewMessages(true);
    //   }
    // });
    return () => {
      // socket.off();
    };
  }, [updateConversationContext, conversations, conversation, loggedInUser]);

  // if (!loggedInUser || !conversation || !conversation.recieverId._id) return <Box></Box>;

  return (
    <Box onClick={setCurrentConverstion} className={classes.conversationRow} key={conversation._id}>
      <Box className={classes.userAvatarBox}>
        {/* <img
          className={classes.userAvatar}
          src={
            loggedInUser._id === conversation.recieverId._id
              ? conversation.senderId.avatar
              : conversation.recieverId.avatar
          }
        /> */}
        <AvatarDisplay loggedIn user={otherUser} />
      </Box>
      <Box className={classes.userNameBox}>
        <Typography className={classes.userName}>{otherUser?.username}</Typography>
        <Typography>{conversation.lastMessage}</Typography>
      </Box>
      <Box className={classes.userMessageDate}>
        <Typography>{moment(conversation.updatedAt).fromNow()}</Typography>
      </Box>
      {/* {haveNewMessages ? <Box className={classes.newMessages}></Box> : ''} */}
    </Box>
  );
};

export default SideBannerItem;
