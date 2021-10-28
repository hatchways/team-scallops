import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { Conversation, ConversationsApiData } from '../interface/Conversation';
import getConversations from '../helpers/APICalls/getConversations';
import { useActiveConversation } from './useActiveConversationContext';
import { useSnackBar } from './useSnackbarContext';

interface IConversationContext {
  conversations: Conversation[] | null | undefined;
  updateConversationContext: () => void;
}

export const ConversationContext = createContext<IConversationContext>({
  conversations: [],
  updateConversationContext: () => null,
});

export const ConversationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[] | null | undefined>();
  const { activeMessages } = useActiveConversation();
  const { updateSnackBarMessage } = useSnackBar();

  const updateConversationContext = useCallback(() => {
    getConversations().then((data: ConversationsApiData) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
        return;
      }
      if (data.success) setConversations(data.success.conversations);
    });
  }, [updateSnackBarMessage]);

  useEffect(() => {
    updateConversationContext();
  }, [updateConversationContext, activeMessages]);

  return (
    <ConversationContext.Provider value={{ conversations, updateConversationContext }}>
      {children}
    </ConversationContext.Provider>
  );
};

export function useConversation(): IConversationContext {
  return useContext(ConversationContext);
}
