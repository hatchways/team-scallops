import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { Conversation } from '../interface/Conversation';
import getConversations from '../helpers/APICalls/getConversations';

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
  // const [currentConversation, setCurrentConversation] = useState<Conversation>();
  const updateConversationContext = useCallback((data: Conversation[]) => {
    console.log('conversations added!');
    setConversations(data);
  }, []);
  // const updateCurrentConversation = (data: Conversation) => {
  //   setCurrentConversation(data);
  // };
  //get all conversations
  useEffect(() => {
    getConversations().then((data: Conversation[]) => {
      console.log(data);
      console.log('Came before here');
      if (!data || data.length) return;
      console.log('Came until here');
      updateConversationContext(data);
    });
  }, [updateConversationContext]);

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
