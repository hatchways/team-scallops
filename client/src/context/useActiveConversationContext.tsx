import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { Conversation, Message, MessagesApiData } from '../interface/Conversation';
import { useSnackBar } from './useSnackbarContext';
import getMessages from '../helpers/APICalls/getMessages';

interface ActiveConversationContext {
  activeConversation: undefined | null | Conversation;
  activeMessages: undefined | null | Message[];
  updateActiveConversation: (data: Conversation) => void;
  updateActiveMessages: () => void;
}

export const ActiveConversationContext = createContext<ActiveConversationContext>({
  activeConversation: undefined,
  activeMessages: undefined,
  updateActiveConversation: () => null,
  updateActiveMessages: () => null,
});

export const ActiveConversationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [activeConversation, setActiveConversation] = useState<undefined | null | Conversation>();
  const [activeMessages, setActiveMessages] = useState<undefined | null | Message[]>();
  const { updateSnackBarMessage } = useSnackBar();
  const updateActiveConversation = useCallback((data: Conversation) => {
    setActiveConversation(data);
  }, []);

  const updateActiveMessages = useCallback(() => {
    getMessages(activeConversation?._id).then((data: MessagesApiData) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
        return;
      }
      setActiveMessages(data.success?.messages);
    });
  }, [activeConversation, updateSnackBarMessage]);

  useEffect(() => {
    updateActiveMessages();
  }, [updateActiveMessages, activeConversation]);

  return (
    <ActiveConversationContext.Provider
      value={{ activeConversation, activeMessages, updateActiveConversation, updateActiveMessages }}
    >
      {children}
    </ActiveConversationContext.Provider>
  );
};

export function useActiveConversation(): ActiveConversationContext {
  return useContext(ActiveConversationContext);
}
