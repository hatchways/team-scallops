import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { Conversation, Message } from '../interface/Conversation';
// import { Conversation } from '../interface/User';
import getMessages from '../helpers/APICalls/getMessages';

interface ActiveConversationContext {
  activeConversation: undefined | null | Conversation;
  activeMessages: undefined | null | Message[];
  updateActiveConversation: (data: Conversation) => void;
  updateActiveMessages: (data: Message[]) => void;
}

export const ActiveConversationContext = createContext<ActiveConversationContext>({
  activeConversation: undefined,
  activeMessages: undefined,
  updateActiveConversation: () => null,
  updateActiveMessages: () => null,
});

export const ActiveConversationProvider: FunctionComponent = ({ children }): JSX.Element => {
  // const [conversations, setConversations] = useState<Conversation[] | null | undefined>();
  const [activeConversation, setActiveConversation] = useState<undefined | null | Conversation>();
  const [activeMessages, setActiveMessages] = useState<undefined | null | Message[]>();
  // const updateConversationContext = useCallback((data: Conversation[]) => {
  //   setActiveConversation(data);
  // }, []);
  // save active conversation
  const updateActiveConversation = useCallback((data: Conversation) => {
    setActiveConversation(data);
  }, []);

  // save active conversation
  const updateActiveMessages = (data: Message[]) => {
    setActiveMessages(data);
  };
  //get all conversations
  useEffect(() => {
    console.log('New messages fetched!');
    getMessages(activeConversation?._id).then((data: Message[]) => {
      if (!data || !data.length) return;
      updateActiveMessages(data);
    });
  }, [updateActiveConversation, activeConversation]);

  return (
    // <ConversationContext.Provider
    //   value={{ currentConversation, conversations, updateConversationContext, updateCurrentConversation }}
    // >
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
