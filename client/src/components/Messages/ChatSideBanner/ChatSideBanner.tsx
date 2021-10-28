import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import SideBannerItem from '../sideBannerItem/SideBannerItem';
import { useConversation } from '../../../context/useConversationContext';
import { useEffect } from 'react';

const ChatSideBanner = (): JSX.Element => {
  const classes = useStyles();
  const { conversations } = useConversation();

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" className={classes.chatSideBannerTitle}>
        <Typography variant={'h4'}>Inbox Messages</Typography>
      </Box>
      {!!conversations?.length &&
        conversations?.map((conversation) => <SideBannerItem key={conversation._id} conversation={conversation} />)}
    </Box>
  );
};

export default ChatSideBanner;
