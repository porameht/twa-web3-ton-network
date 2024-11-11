import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, FlexBoxCol, Button } from './styled/styled';
import { TonConnectButton } from '@tonconnect/ui-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Card>
        <FlexBoxCol>
          <h3>Please Connect Your Wallet</h3>
          <p>You need to connect your wallet to access this section.</p>
          <TonConnectButton />
        </FlexBoxCol>
      </Card>
    );
  }

  return <>{children}</>;
} 