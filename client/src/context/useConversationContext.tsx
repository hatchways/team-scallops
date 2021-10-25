import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { Conversation } from '../interface/Conversation';
import getConversations from '../helpers/APICalls/getConversations';
import { useActiveConversation } from './useActiveConversationContext';

interface IConversationContext {
  // currentConversation: Conversation | null | undefined;
  conversations: Conversation[] | null | undefined;
  updateConversationContext: (data: Conversation[]) => void;
  // updateCurrentConversation: (data: Conversation) => void;
}

export const ConversationContext = createContext<IConversationContext>({
  // currentConversation: undefined,
  conversations: [],
  updateConversationContext: () => null,
  // updateCurrentConversation: () => null,
});

export const ConversationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[] | null | undefined>();
  const { activeMessages } = useActiveConversation();
  // const [currentConversation, setCurrentConversation] = useState<Conversation>();
  const updateConversationContext = useCallback((data: Conversation[]) => {
    setConversations(data);
  }, []);
  // const updateCurrentConversation = (data: Conversation) => {
  //   setCurrentConversation(data);
  // };
  //get all conversations
  useEffect(() => {
    console.log('New conversations fetched!');
    getConversations().then((data: Conversation[]) => {
      if (!data || !data.length) return;
      updateConversationContext(data);
    });
  }, [updateConversationContext, activeMessages]);

  return (
    // <ConversationContext.Provider
    //   value={{ currentConversation, conversations, updateConversationContext, updateCurrentConversation }}
    // >
    <ConversationContext.Provider value={{ conversations, updateConversationContext }}>
      {children}
    </ConversationContext.Provider>
  );
};

export function useConversation(): IConversationContext {
  return useContext(ConversationContext);
}
