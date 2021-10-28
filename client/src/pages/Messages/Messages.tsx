import React, { useEffect } from 'react';
import { Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import ChatSideBanner from '../../components/Messages/ChatSideBanner/ChatSideBanner';
import MessageChat from '../../components/Messages/messageChat/MessageChat';
import { useActiveConversation } from '../../context/useActiveConversationContext';
import { useConversation } from '../../context/useConversationContext';
import useStyles from './useStyles';
const Conversations = (): JSX.Element => {
  const classes = useStyles();
  const { activeConversation } = useActiveConversation();
  const { updateConversationContext } = useConversation();

  useEffect(() => {
    updateConversationContext();
  }, [updateConversationContext, activeConversation]);

  return (
    <>
      <CssBaseline />
      <Grid container className={classes.conversationBody}>
        <Grid item xs={3} elevation={2} component={Paper} className={classes.sideBar}>
          <ChatSideBanner />
        </Grid>
        <Grid item xs={9} className={activeConversation ? classes.sideBar : classes.sideBarInactive}>
          {activeConversation ? <MessageChat /> : <Typography>Please select a conversation</Typography>}
        </Grid>
      </Grid>
    </>
  );
};

export default Conversations;
