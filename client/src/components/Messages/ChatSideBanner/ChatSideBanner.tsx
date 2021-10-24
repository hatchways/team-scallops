import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import SideBannerItem from '../sideBannerItem/SideBannerItem';
import { useConversation } from '../../../context/useConversationContext';

const ChatSideBanner = (): JSX.Element => {
  const classes = useStyles();
  const { conversations } = useConversation();
  const renderConversations = () => {
    console.log('Rendering' + conversations);
    if (!conversations || !conversations.length) return <Box>No Conversations</Box>;
    // return conversations.map((conversation) => {
    //   return <SideBannerItem key={conversation._id} conversation={conversation} />;
    // });
  };
  return (
    <Box>
      <Box className={classes.conversationTitle}>
        <Typography variant={'h3'} className={classes.conversationTitleH}>
          Messages
        </Typography>
      </Box>
      <Box className={classes.conversationBody}>{renderConversations()}</Box>
    </Box>
  );
};

export default ChatSideBanner;
