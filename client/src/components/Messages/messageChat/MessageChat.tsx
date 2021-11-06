import { LegacyRef, useEffect, useRef, useState } from 'react';
import useStyles from './useStyles';
import MessageInput from '../MessageInput/MessageInput';
import { Box, IconButton, Paper, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { User } from '../../../interface/User';
import { useAuth } from '../../../context/useAuthContext';
import { useActiveConversation } from '../../../context/useActiveConversationContext';
import { useConversation } from '../../../context/useConversationContext';
import { useSocket } from '../../../context/useSocketContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import AvatarDisplay from '../../AvatarDisplay/AvatarDisplay';
import { Message, PostMessageApiData } from '../../../interface/Conversation';
import sendMessage from '../../../helpers/APICalls/sendMessage';
import { FormikHelpers } from 'formik';
import moment from 'moment';
import clsx from 'clsx';

const MessageChat = (): JSX.Element => {
  const classes = useStyles();
  const { activeConversation, activeMessages } = useActiveConversation();
  const { socket } = useSocket();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [sender, setSender] = useState<User | null | undefined>();
  const [receiver, setReceiver] = useState<User | null | undefined>();
  const [messages, setMessages] = useState<Message[] | null | undefined>();
  const scrollRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);

  const handleMessageSend = (values: { message: string }, props: FormikHelpers<{ message: string }>) => {
    sendMessage(activeConversation?._id, values.message).then((data: PostMessageApiData) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else {
        socket?.emit('sendMessage', data.success?.message, receiver?._id);
        setMessages((prev) => {
          if (!prev) return prev;
          if (!data.success) return prev;
          return [...prev, data.success?.message];
        });
        props.resetForm();
      }
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (!activeConversation) return;
    setSender(loggedInUser);
    setReceiver(
      loggedInUser?.id === activeConversation?.firstUser._id
        ? activeConversation?.secondUser
        : activeConversation?.firstUser,
    );
    setMessages(activeMessages);
  }, [activeConversation, loggedInUser, activeMessages]);

  useEffect(() => {
    const newMessageListener = (message: Message) => {
      if (!message.text || !receiver || !message._id || message.sender._id !== receiver?._id) return;
      if (!(message.conversation === activeConversation?._id)) return;

      setMessages((prev) => {
        if (!prev) return prev;
        return [...prev, message];
      });
    };
    socket?.on('newMessage', newMessageListener);
    return () => {
      socket?.off('newMessage', newMessageListener);
    };
  }, [activeConversation, socket, receiver]);

  const renderMessage = (message: Message, messageId: string) => {
    const isSenderMessage = message.sender._id === sender?.id;
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isSenderMessage ? 'flex-end' : 'flex-start'}
        key={messageId}
        className={isSenderMessage ? classes.senderRightMessage : classes.receiverLeftMessage}
      >
        <Box mb={'0.5rem'} display="flex">
          {!isSenderMessage && <AvatarDisplay loggedIn user={receiver} />}
          <Box
            component={Paper}
            className={clsx({
              [classes.userMessageBox]: true,
              [classes.grayUserMessages]: isSenderMessage,
            })}
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
      {!!sender && !!receiver && (
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
              {messages?.map((message) => renderMessage(message, message._id))}
              <div ref={scrollRef} />
            </Box>
          </Box>
          <MessageInput handleMessageSend={handleMessageSend} />
        </>
      )}
    </>
  );
};

export default MessageChat;
