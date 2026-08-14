import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // On production: connect to same origin (Nginx proxies /socket.io/ to backend)
    // On dev (localhost): connect directly to backend port
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const serverUrl = isDev ? 'http://localhost:5000' : window.location.origin;
    
    const newSocket = io(serverUrl, {
      path: '/socket.io/',
      transports: ['websocket', 'polling']
    });
    
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
