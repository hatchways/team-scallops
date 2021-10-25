import { useEffect, useState } from 'react';
import useStyles from './useStyles';
import MessageInput from '../MessageInput/MessageInput';
import { Box, IconButton, Paper, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { User } from '../../../interface/User';
import { useAuth } from '../../../context/useAuthContext';
import { useActiveConversation } from '../../../context/useActiveConversationContext';
import AvatarDisplay from '../../AvatarDisplay/AvatarDisplay';
import moment from 'moment';
import { Message } from '../../../interface/Conversation';

const MessageChat = (): JSX.Element => {
  const classes = useStyles();
  const { activeConversation, updateActiveConversation, activeMessages } = useActiveConversation();
  const { loggedInUser } = useAuth();
  const otherUser =
    loggedInUser?.id === activeConversation?.firstUser._id
      ? activeConversation?.secondUser
      : activeConversation?.firstUser;
  const [sender, setSender] = useState<User | null | undefined>();
  const [receiver, setReceiver] = useState<User | null | undefined>();

  useEffect(() => {
    if (!activeConversation) return;
    setSender(loggedInUser);
    setReceiver(otherUser);
  }, [otherUser, activeConversation, loggedInUser]);

  const renderMessage = (message: Message, messageIndex: number) => {
    const isSenderMessage = message.sender._id === sender?.id;
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isSenderMessage ? 'flex-end' : 'flex-start'}
        key={messageIndex}
        className={isSenderMessage ? classes.senderRightMessage : classes.receiverLeftMessage}
      >
        <Box mb={'0.5rem'} display="flex">
          {!isSenderMessage && <AvatarDisplay loggedIn user={receiver} />}
          <Box
            component={Paper}
            className={`${classes.userMessageBox} ${isSenderMessage ? '' : classes.grayUserMessages}`}
          >
            <Typography className={classes.messageText}>{message.text}</Typography>
          </Box>
        </Box>
        <Box className={classes.sentTimeText}>{moment(message.updatedAt).format('h:mm a, MMMM Do YYYY')}</Box>
      </Box>
    );
  };

  return (
    <>
      {sender && receiver && (
        <>
          <Box display="flex" alignItems="center" className={classes.chatTitle}>
            <AvatarDisplay loggedIn size={60} user={receiver} />
            <Typography className={classes.chatTitleUsername}>{receiver?.username}</Typography>
            <Box flexGrow={1} />
            <IconButton aria-label="show auth menu" aria-controls="auth-menu" aria-haspopup="true" onClick={() => null}>
              <MoreHorizIcon />
            </IconButton>
          </Box>
          <Box className={classes.chatBoxWrapper}>
            <Box display="flex" justifyContent="flex-start" flexDirection="column" className={classes.chatContentBox}>
              {activeMessages?.map((message, messageIndex) => renderMessage(message, messageIndex))}
            </Box>
          </Box>
          <MessageInput activeConversation={activeConversation} />
        </>
      )}
    </>
  );
};

export default MessageChat;
