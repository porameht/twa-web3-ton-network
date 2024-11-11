import { createContext, useContext, ReactNode } from 'react';
import { useTonConnect } from '../hooks/useTonConnect';

interface AuthContextType {
  isAuthenticated: boolean;
  wallet: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  wallet: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { connected, wallet } = useTonConnect();

  const value = {
    isAuthenticated: connected,
    wallet,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 