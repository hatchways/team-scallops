import { useState, useContext, createContext, FunctionComponent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSnackBar } from './useSnackbarContext';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
  disconnectSocket: () => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
  disconnectSocket: () => null,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { updateSnackBarMessage } = useSnackBar();

  const initSocket = useCallback(() => {
    if (!!socket) return;
    const newSocket = io('/', {
      withCredentials: true,
    });

    newSocket.on('connect_error', (error) => {
      updateSnackBarMessage(error.message);
    });

    setSocket(newSocket);
  }, [socket, updateSnackBarMessage]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
    setSocket(undefined);
  }, [socket]);

  return <SocketContext.Provider value={{ socket, initSocket, disconnectSocket }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
