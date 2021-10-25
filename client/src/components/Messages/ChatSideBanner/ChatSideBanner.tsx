import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import SideBannerItem from '../sideBannerItem/SideBannerItem';
import { useConversation } from '../../../context/useConversationContext';

const ChatSideBanner = (): JSX.Element => {
  const classes = useStyles();
  const { conversations } = useConversation();

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" className={classes.chatSideBarTitle}>
        <Typography variant={'h4'}>Inbox Messages</Typography>
      </Box>
      {conversations?.length &&
        conversations?.map((conversation, elId) => <SideBannerItem key={elId} conversation={conversation} />)}
    </Box>
  );
};

export default ChatSideBanner;
